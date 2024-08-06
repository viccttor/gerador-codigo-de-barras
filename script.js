function generateBarcode() {
    var input = document.getElementById('barcodeInput').value.trim();
    var type = document.getElementById('barcodeType').value;
    var errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = '';

    // Validações
    if (!input) {
        errorMessage.textContent = 'Por favor, insira um texto.';
        return;
    }
    if (!type) {
        errorMessage.textContent = 'Por favor, selecione um tipo de código de barras.';
        return;
    }

    if (type === 'EAN13' && (input.length !== 12 && input.length !== 13)) {
        errorMessage.textContent = 'EAN-13 requer 12 ou 13 dígitos.';
        return;
    } else if (type === 'UPC' && input.length !== 12) {
        errorMessage.textContent = 'UPC requer 12 dígitos.';
        return;
    } else if (type === 'ITF14' && input.length !== 14) {
        errorMessage.textContent = 'ITF-14 requer 14 dígitos.';
        return;
    }

    var canvas = document.getElementById('barcodeCanvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = 300; // Largura padrão
    canvas.height = 150; // Altura padrão

    var options = {
        format: type,
        lineColor: "#000",
        width: 2, // Largura padrão da linha
        height: 100, // Altura padrão
        displayValue: true,
        fontOptions: "",
        font: "monospace",
        textMargin: 2,
        fontSize: 20, // Tamanho padrão da fonte
        background: "#ffffff",
        margin: 10,
        flat: false
    };

    try {
        JsBarcode(canvas, input, options);
    } catch (error) {
        errorMessage.textContent = 'Erro ao gerar o código de barras: ' + error.message;
    }
}

function downloadBarcode() {
    var input = document.getElementById('barcodeInput').value.trim();
    var canvas = document.getElementById('barcodeCanvas');

    if (!input) {
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Por favor, insira um texto antes de baixar o código de barras.';
        return;
    }

    var link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = input + '.png';
    link.click();
}
