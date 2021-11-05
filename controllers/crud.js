//Invocamos a la conexion de la DB
const conexion = require('../database/db');



//GUARDAR un REGISTRO

exports.save = (req, res)=>{
    console.log(req.body)
    const producto = req.body.producto;
    const categoria = req.body.categoria;
    const precio = req.body.precio;
    const disponibles = req.body.disponibles;


    conexion.query('INSERT INTO productos SET ?',{producto:producto, categoria:categoria, precio:precio, disponibles:disponibles}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');        
        }
    });
};

//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id = req.body.id;
    const producto = req.body.producto;
    const categoria = req.body.categoria;
    const precio = req.body.precio;
    const disponibles = req.body.disponibles;
    
    conexion.query('UPDATE productos SET ? WHERE id = ?',[{producto:producto, categoria:categoria, precio:precio, disponibles:disponibles}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    });

//ELIMINAR un REGISTRO
/*
exports.delete = (req, res)=>{
    console.log(req.params.id)    ;
    console.log('LLEGAMOS A ELIMINAR');
    const id = req.body.id;
    conexion.query('DELETE FROM users WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    }) 
}*/
};