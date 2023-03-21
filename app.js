const { MongoClient } = require('mongodb');
// const mysql = require('mysql')
const express = require('express');
const server = express();


// const uri ='mongodb://0.0.0.0:27017/okulDeneme';
// MongoClient.connect(uri, (err, client) => {
//   if (err) {
//     console.log(err);
//     return;
   
  
//   }else{
//     console.log("Bağlantı başarılıııııı!");

//     // Veritabanı işlemleri burada gerçekleştirilir
//   client.close();
    
//   }

 
// });

// const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017';
const database = 'okulDeneme'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// async function getData()
// {
//     let result = await client.connect();
//     let db = result.db(database);
//     let collection = db.collection('okul');
//     let response =  await collection.find({}).toArray();
//     console.log(response);
// }
// getData();
async function getData() {
  try {
    await client.connect();
    console.log('MongoDB bağlantısı başarılı');

    const db = client.db(database);
    const collection = db.collection('okul');
    const response = await collection.find({}).toArray();
    console.log(response);
  } catch (error) {
    console.log('MongoDB bağlantısı hatası:', error);
  } finally {
    // await client.close();
    // console.log('MongoDB bağlantısı kapatıldı');
  }
}

getData();



async function addData(data) {
  let result = await client.connect();
  let db = result.db(database);
  let collection = db.collection('okul');
  let response = await collection.insertOne(data);
  console.log(response.insertedCount + " veri eklendi");
}
addData({ ad: "Ali", soyad: "Yılmaz", yaş: 18 });
//addData({ ad: "abdullah", soyad: "yalçın ", yaş: 45 });


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'nodejs'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Hata:', err.stack);
//     return;
//   }

//   console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');
// });

// const uri = "mongodb://localhost:27017/";
// const client = new MongoClient(uri);
// const uri = 'mongodb://localhost:27017/okulDeneme';
// const uri ='mongodb+srv://root:mongodb47@cluster0.v8w3m6n.mongodb.net/test';

// MongoClient.connect(uri, (err, client) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//     console.log("Bağlantı başarılı!");
  

//   //mongodb://localhost:27017/okulDeneme

//   // Veritabanı işlemleri burada gerçekleştirilir

//   client.close();
// });
// server.get('/test',async (req,res)=>{
// try {
//   let result = await getdata();
//   res.send(result);
// } catch (err) {
//   console.error(err);
//   res.status(500).send("veriler alırken bir hata oluştu")
// }


//   // res.send("api sayfasına hoşgeldiniz")
// })


////////*******************////// */

server.get('/test', async (req, res) => {
  try {
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection('okul');
    let response = await collection.find({}).toArray();
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send('veriler yüklenirken hata oluştu');
  }
});







server.listen(3000,(req,res)=>{
  
  
  console.log("3000 portu çalışıyor")
})


