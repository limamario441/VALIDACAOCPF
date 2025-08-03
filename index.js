   class ValidaCPF {
      constructor(cpf) {
        this.cpfLimpo = cpf.replace(/\D+/g, '');
      }
      get eValido() {
        if (!this.cpfLimpo || this.cpfLimpo.length !== 11) return false;
        if (this.eSequencia) return false;
        const parcial = this.cpfLimpo.slice(0, 9);
        const digito1 = this.criaDigito(parcial);
        const digito2 = this.criaDigito(parcial + digito1);
        return this.cpfLimpo === parcial + digito1 + digito2;
      }
      criaDigito(parcial) {
        const soma = [...parcial].reduce((total, num, i) => {
          return total + Number(num) * (parcial.length + 1 - i);
        }, 0);
        const resto = 11 - (soma % 11);
        return resto > 9 ? '0' : String(resto);
      }
      get eSequencia() {
        return this.cpfLimpo.split('').every(c => c === this.cpfLimpo[0]);
      }
    }

    // Máscara automática para CPF
    document.getElementById('cpf').addEventListener('input', function() {
      let valor = this.value.replace(/\D/g, '');
      if (valor.length > 3) valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
      if (valor.length > 6) valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      if (valor.length > 9) valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
      this.value = valor;
    });

    function validarCPF() {
      const cpfInput = document.getElementById("cpf").value;
      const resultado = document.getElementById("resultado");
      const valida = new ValidaCPF(cpfInput);

      if (valida.eValido) {
        resultado.textContent = "✅ CPF Válido!";
        resultado.className = "resultado valido";
      } else {
        resultado.textContent = "❌ CPF Inválido!";
        resultado.className = "resultado invalido";
      }
    }