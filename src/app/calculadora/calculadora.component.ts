import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "app-calculadora",
  templateUrl: "./calculadora.component.html",
  styleUrls: ["./calculadora.component.css"],
})
export class CalculadoraComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}
  total = 0;
  inputValor: string = "0";
  operadorAnterior: any;
  
  buttonClick(value: any): void {
    const inputElement = document.getElementById("screen") as HTMLInputElement;
    if (isNaN(value)) {
      this.obtenerSimbolo(value);
    } else {
      this.obtenerNumero(value);
    }
    inputElement.value = this.inputValor;
  }
  obtenerSimbolo(value: any) {
    const inputElement = document.getElementById("screen") as HTMLInputElement;
    switch (value) {
      case "C":
        inputElement.value = "0";
        this.inputValor = "0";
        this.total = 0;
        break;
      case "←":
        if (this.inputValor.length === 1) {
          this.inputValor = "0";
        } else {
          this.inputValor = this.inputValor.substring(
            0,
            this.inputValor.length - 1
          );
        }
        break;
      case "=":
        if (this.operadorAnterior === null) {
          return;
        }
        this.ejecutarOperacion(parseInt(this.inputValor));
        this.operadorAnterior = null;
        this.inputValor = this.total.toString();
        this.total = 0;
        break;
      case "−":
      case "+":
      case "×":
      case "÷":
        this.ProcesarSimbolo(value);
        break;
    }
  }
  ProcesarSimbolo(symbol: symbol) {
    if (this.inputValor === "0") {
      return;
    }
    const intInputValor = parseInt(this.inputValor);
    if (this.total === 0) {
      this.total = intInputValor;
    } else {
      this.ejecutarOperacion(intInputValor);
    }
    this.operadorAnterior = symbol;
    this.inputValor = "0";
  }
  ejecutarOperacion(intInputValor: number) {
    if (this.operadorAnterior === "+") {
      this.total += intInputValor;
    } else if (this.operadorAnterior === "−") {
      this.total -= intInputValor;
    } else if (this.operadorAnterior === "×") {
      this.total *= intInputValor;
    } else if (this.operadorAnterior === "÷") {
      this.total /= intInputValor;
    }
  }

  obtenerNumero(numberString: string) {
    if (this.inputValor === "0") {
      this.inputValor = numberString;
    } else {
      this.inputValor += numberString;
    }
  }

  ngOnInit() {
    const calcButton =
      this.elementRef.nativeElement.querySelector(".calc-buttons");
    calcButton?.addEventListener("click", (event: Event) => {
      this.buttonClick((event.target as HTMLButtonElement).innerHTML);
    });
  }
}
