const blueDollarPriceElement = document.getElementById("blueDollar");
const blueDollarPriceAvg = document.getElementById("blueDollarAvg");
const euroBlueSellElement = document.getElementById("euroVenta");
const elDolar = document.getElementById("elDolar");
const contador = document.getElementById("contador");

//Buscar el valor del dolar en API
async function fetchBlueDollarPrice() {
    try {
      const response = await fetch("https://api.bluelytics.com.ar/v2/latest"); //API: bluelytics
      if (!response.ok) {
        throw new Error(`Error de HTTP! Estado: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error("Fetch error:", error);
      const blueDollarPriceElement = document.getElementById("blueDollar");
      blueDollarPriceElement.textContent = "No hay precio, flaco"
    }    
  }

  //Hace un display de la info
  async function logData(){
    fetchBlueDollarPrice().then(function(data){
      
      // Accediendo a los valores
      const blueDollarValueAvg = data.blue.value_avg;   //Valor promedio
      const blueDollarValueSell = data.blue.value_sell; //Valor de venta
      //const blueDollarValueBuy = data.blue.value_buy;   //Valor de compra

      //Yapa EURO BLUE
      const euroBlueSell = data.blue_euro.value_sell; //Valor de venta euro blue

      // Actualizando el valor del dolar
      const blueDollarPriceElement = document.getElementById("blueDollar");
      blueDollarPriceElement.textContent = blueDollarValueSell;

      const dollarAvgInt = parseInt(blueDollarValueAvg); //Pasa el valor promedio a número entero
      const blueDollarPriceAvg = document.getElementById("blueDollarAvg");
      blueDollarPriceAvg.textContent = dollarAvgInt;

      //Display Euro Blue
      const euroBlueSellElement = document.getElementById("euroVenta");
      euroBlueSellElement.textContent = euroBlueSell;
    })
  }

  function conversion(pesos){
    let resultado = 0;
    return fetchBlueDollarPrice().then(function(data){
      const blueDollarValueSell = data.blue.value_sell; //Valor de venta
      resultado = pesos / parseInt(blueDollarValueSell)
      return resultado
    })
  }


  function makeConversion(){
    const input = document.querySelector('#conversion')
    let resultado = 0
    input.addEventListener('keypress', function(e){
      if(e.key === 'Enter'){
        conversion(input.value).then(function(data){
            resultado = data.toFixed(2)
            console.log(`el resultado es: ${resultado}`)
            showConversion(resultado);
          })
      }
    })
  }

  function showConversion(data){
    const input = document.querySelector('#conversion')
    const resultado = document.querySelector('#resultado')
    resultado.textContent = `Tus ${input.value} pesos(ARS) equivalen a ${data} dólares americanos (USD)`
  }

// Llamando la función que busca el valor
logData();
makeConversion();
setInterval(fetchBlueDollarPrice, 60000); // Actualiza la llamada a la función cada 10 minutos

//Testing merge/push problems