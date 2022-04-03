import supertest from "supertest";
import chai,{expect} from 'chai';
import { describe } from "mocha";

const request = supertest('http://localhost:8080');

describe('Test de API',()=>{
    describe('GET',()=>{
        it('La petición me debe traer todos los productos en un array',async()=>{
            let res = await request.get('/api/productos');
            expect(res).to.contain([])
        })
        it('La petición debe devolver status 200', async()=>{
            let res = await request.get('/api/productos');
            expect(res.status).to.equal(200)
        })
    })
    describe('POST',()=>{
        it('La petición debe generar un producto nuevo',async ()=>{
            let res = await request.post('/api/productos').send({
                nombre:"Producto de prueba",
                descripcion:"Este es un producto de prueba",
                codigo:123,
                thumbnail:"fotito",
                precio:123,
                stock:123
            });
            expect(res.body).to.have.keys("_id","codigo","precio","stock","thumbnail","resume")
        })
        it('La petición debe retornar un status de 201',async()=>{
            let res = await request.post('/api/productos').send({
                nombre:"Producto de prueba",
                descripcion:"Este es un producto de prueba",
                codigo:123,
                thumbnail:"fotito",
                precio:123,
                stock:123
            });
            expect(res.status).to.equal(201)
        })
    })
    describe('PUT',()=>{
        it('Al enviar un id se debe actualizar un producto',async (done)=>{
            let product =  await request.post('/api/productos').send({
                nombre:"Producto de prueba",
                descripcion:"Este es un producto de prueba",
                codigo:123,
                thumbnail:"fotito",
                precio:123,
                stock:123
            });
            let res = await request.put(`/api/productos/${product.body._id}`).send({
                nombre:"Producto actualizado",
                descripcion:"Este es un producto actualizado",
                codigo:123,
                thumbnail:"fotito",
                precio:123,
                stock:123
            });
            expect(res.status).to.equal(204);
            done();
        })
    })
    describe('DELETE',()=>{
        it('El producto debe eliminarse correctamente y debe devolver un status 204',async(done)=>{
            let product =  await request.post('/api/productos').send({
                nombre:"Producto de prueba",
                descripcion:"Este es un producto de prueba",
                codigo:123,
                thumbnail:"fotito",
                precio:123,
                stock:123
            });
            let res = await request.delete(`/api/productos/${product.body._id}`);
            expect(res.status).to.equal(204);
            done()
        })
    })
})