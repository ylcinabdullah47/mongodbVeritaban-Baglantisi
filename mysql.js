console.log("selamtest");
//bu kısımda mysql veri tabanı işlemleri yapılacak

const express = require('express');
const server = express();
const mysql = require('mysql2');

//bağlantı için gerekli bilgiler
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'egitim',
    port:3306,
    //olmasada olur işin show tarafı bu
    charset: 'UTF8_GENERAL_CI'
})
// hata alıyorum bakılacak

// server.use(express.json())
// server.use(express.urlencoded({extended: true}))

//bağlantıyı  olup olmadığını kotrol ediyoruz
connection.connect((err=>{
    if (err) {
        console.log("mysql bağlantı hatası")
    }
    //kod yazarak database oluşturabiliriz
    // connection.query('CREATE DATABASE egitim47',(err,result)=>{
    //     if (err) {
    //         console.log('err',err)
    //     }
    //     else{
    //         console.log('result',result)
    //     }
    // })
    
        console.log("mysql bağlantı başarılı")
    
}))

// server.post('/users',async (req,res)=>{
   
// })



server.get('/sayfa1',(req,res)=>{
    res.status(200).send(`<h1>sayfa1 hoşgeldin</h1>`)
    
})

// server.get('/',(req,res)=>{
    
// })

// server.post()

// basit şekilde veri tabanındaki kayıtları getirme
let sqlsorgu = `SELECT*FROM kullanicilar`;
connection.connect(function(err){
    if (err) throw err;
    connection.query(sqlsorgu,function(err,result){
         if (err) throw err.message;
    console.log(result); 
    });
});
//veri tabanına tek veri gönderme işlemi 
const ogrenci={ad:"mehmet akif",yaş:74};
// connection.connect(function(err){
//     if (err) throw err;
    connection.query('INSERT INTO kullanicilar SET ?',ogrenci,(err,results,fields)=>{
        if (err) throw err;
        console.log('yeni kullanıcı eklendi İD:' + results.insertId); 
       
    });
  
    //veri tabanına birden fazla veri gönderme işlemi

    const ogrenciler = [
        {ad:"hayri",soyad:"metin",yaş:19},
        {ad:"nuri",soyad:"üstün",yaş:32},
        {ad:"resul",soyad:"yalçın",yaş:45},
        {ad:"ayşe",soyad:"özel",yaş:56},
        {ad:"ece",soyad:"gündüz",yaş:18}
    ]

    const dataOgrenci = ogrenciler.map((e => [e.ad, e.soyad, e.yaş]));
    
    const sql=`INSERT INTO kullanicilar(ad,soyad,yaş) VALUES ?`;
    
    connection.query(sql,[dataOgrenci],(err,result)=>{
        if (err) throw err;
        console.log("yeni çoklu kayıt başarılı" +'-'+ result.affectedRows); 
            
        
    })

   //veri silme işlemi burda yapılıyor

let sqlDelete =`DELETE FROM kullanicilar WHERE id='2'`;
connection.connect(function (err) {
    if (err) throw err;
    connection.query(sqlDelete,function(err,results){
        if(err) throw err;


        //veri silme kontrol
        if (results.affectedRows > 0) {
            console.log(results.affectedRows + 'kayıt silindi')}
   } )
    
})


//burası hatalı çalışıyor 
//yapılmak istene kullanıcıdan id numarası alınıp veriyi silmek

// server.get('/delete',(req,res)=>{
//     let sqlDelete = prompt("silmek istediğiniz id yazın",`DELETE FROM kullanicilar WHERE ıd=''`)
//     // let sqlDelete =;
//     connection.connect(function (err) {
//         if (err) throw err;
//         connection.query(sqlDelete,function(err,results){
//             if(err) throw err;
    
    
//             //veri silme kontrol
//             if (results.affectedRows > 0) {
//                 console.log(results.affectedRows + 'kayıt silindi')}
//        } )
        
//     })


// })

    
// });
// const user = { ad: 'john.doe', yaş: 35 };

// connection.query('INSERT INTO kullanicilar SET ?', user, (error, results, fields) => {
//   if (error) throw error;
//   console.log('New user added with ID ' + results.insertId);
// });


// server.get('/delete',(req,res)=>{
//     res.send(`
//     <form action="/delete" method="POST">
//     <input type="text" name="id" placeholder="Silmek istediğiniz ID'yi girin">
//     <button type="submit">Sil</button>
// </form>
//     `)
// });
// server.post('/delete',(req,res)=>{
    
//     let id = req.body.id;
//     let sqlDelete =`DELETE FROM kullanicilar WHERE id ='${id}'`;
//     connection.query(sqlDelete,function(err,results){
//         if (err) throw err; 
//             //veri silem kotrol
//             if (results.affectedRows >0) {
//                 console.log(results.affectedRows + 'kayıt silindi')
//             }
       
//     })
// })
//bu eklenmedğinde boş değer dönüyor ve program hata veriyor
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));
server.get('/delete', (req, res) => {
    res.send(`
        <form action="/delete" method="POST">
            <input type="text" name="id" placeholder="Silmek istediğiniz ID'yi girin">
            <button type="submit">Sil</button>
        </form>
    `);
});

server.post('/delete', (req, res) => {
    let id = req.body.id;
    let sqlSorgusu = `DELETE FROM kullanicilar WHERE id = '${id}'`;
    connection.query(sqlSorgusu, function (err, results) {
        if (err) throw err;
        // Veri silme kontrolü
        if (results.affectedRows > 0) {
            console.log(results.affectedRows + ' kayıt silindi.');
        }
    });
});









server.listen(4000,(req,res)=>{

   
    console.log("4000 portu çalışıyor")
})  