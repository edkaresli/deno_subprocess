const fs = require('fs');

const amount = 1000; // milliseconds

const countTime = () => {
  let counts = 0;
  const id = setInterval(() => {    
    const time = new Date();
    fs.appendFile('./data/output.txt', `${time.toLocaleTimeString()}\n`, (err) => {  
      if(err) {
        console.error(err);
      }    
      else {
        console.log('Time: ', time.toLocaleTimeString());
        console.log('counts: ', counts);
      }                        
    });   
    
    if(counts > 5) {
      clearInterval(id);
      console.log('Finished logging time');
    }    
    counts += 1;
  }, amount);    
}

countTime();
