const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const addToStats = (type, good) => {
  fs.readFile('./status.json', 'utf8', (err, data) => {
    const stats = JSON.parse(data);
    status.push({
      
    })
    fs.writeFile('./cart.json', JSON.stringify(stats));    
  }) 
}

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
  fs.readFile('./catalog.json', 'utf8', (err, data) => {
    if (err) return;
    res.send(data);
  })
});

app.get('/cart', (req, res) => {
  fs.readFile('./cart.json', 'utf8', (err, cartJson) => {  
    if (err) return;
    const cart = JSON.parse(cartJson);
    
    fs.readFile('./catalog.json', 'utf8', (err, catalogJson) => {
      if (err) return;
      const catalog = JSON.parse(catalogJson);
      const cartAsArray = Object.keys(cart).map( goodId => {
        const good = catalog.find(item => item.id === parseInt(goodId));
        console.log(cart);
        if(!good) return;
        return {
          ... good,
          count: cart.goodId,
          sum: good.price * cart[goodId]
        };
      });  
      res.send(cartAsArray);
    });
  })
});

app.post('/addToCart', (req, res) => {
  fs.readFile('./cart.json', 'utf8', (err, data) => {
    
    const cart = JSON.parse(data);
    const { goodId } = req.body;
    console.log(cart);
    console.log(cart[goodId]);
    if (cart[goodId]) {
      console.log(cart[goodId]);
      cart[goodId] = ++cart[goodId];
    } else {
      cart[goodId] = 1;
    }

    fs.writeFile('./cart.json', JSON.stringify(cart), err => {
      if (err) {
        res.send('{"result:" "error"');
      } else {
        const resBody = {};
        resBody.result = {
          id: goodId,
          count: cart[goodId]
        };        
      res.send(JSON.stringify(resBody));
      }  
    });
  })
});

app.delete('/good', (req, res) => {
  fs.readFile('./cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse(data);
    const { goodId } = req.body;
    if (!cart[goodId]) return;
    if (cart[goodId] === 1) {
      delete cart[goodId];      
    } else {
      cart[goodId] = --cart[goodId];
    }

    fs.writeFile('./cart.json', JSON.stringify(cart), err => {
      if (err) {
        res.send('{"result:" "error"');
      } else {
        const resBody = {};
        resBody.result = {
          id: goodId,
          count: cart[goodId]
        };        
      res.send(JSON.stringify(resBody));
      }  
    });

  })
});
app.delete('/goods', (req, res) => {
  fs.readFile('./cart.json', 'utf8', (err, data) => {
    const cart = JSON.parse(data);
    const { goodId } = req.body;
    delete cart[goodId];

    fs.writeFile('./cart.json', JSON.stringify(cart), err => {
      if (err) {
        res.send('{"result:" "error"');
      } else {
        const resBody = {};
        resBody.result = { goodId };        
        res.send(JSON.stringify(resBody));
      }  
    });

  })
});
app.delete('/clearCart', (req, res) => {
  fs.writeFile('./cart.json', "{}", err => {
    if (err) {
      res.send('{"result:" "error"');
    } else {
      res.send(JSON.stringify({}));
    };          
  });
});

app.listen(3000, function () {
  console.log('server is running on port 3000');
});
