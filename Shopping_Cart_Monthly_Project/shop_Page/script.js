var fetchedData;

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    fetchedData = data; // Store the fetched data in the variable
    console.log(fetchedData); // Access the fetched data
  })
  .catch(error => {
    console.log('Error:', error);
  });


// function to update data object to add size and colors

function updatedata(data){
    data.forEach(item =>{
        item.color=randomcolor();
    })
}

function randomcolor(){
    let color=["red", "blue", "green", "black", "white"];
    var randomindex=(Math.floor(Math.random()));
    return color[randomindex];
}



console.log(updatedata(fetchedData));
