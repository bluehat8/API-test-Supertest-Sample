const request= require('supertest')

const app=require('../src/app')
const usuarioEspecífico='U0001'


//Testeando el obtener todos los usuarios

describe("GET /users", ()=>{
    it('Responder con la lista de todos los usuarios', done=>{
        request(app).get('/users').set('Aceptado', 'application/json').expect('Content-Type', /json/).expect(200,done)
    });
});

describe("/GET /users/:id", ()=>{
it('Responder con json que contiene un usuario específico '+usuarioEspecífico, (done)=>{
request(app).get('/users/'+usuarioEspecífico).set('Aceptado', 'application/json').expect('Content-Type', /json/).expect(200,done)

});

it('responde con json "user not found" cuando el usuario no existe', done=>{
 request(app).get('/users/'+usuarioEspecífico+'no existe').set('Accept', 'application/json').expect('Content-Type', /json/).expect(404).expect('"user not found"').end((err) => {
    if(err) return done(err);
    done();
 })

})
});





/**
 * Testing POST users endpoint
 */
describe("POST /users", () => {
    it("respond with 201 created", (done) => {
      const data = {
        username: "fazt",
        password: "password123",
      };
      request(app)
        .post("/users")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  
    it("respond with 400 on bad request", (done) => {
      const data = {
        // no username and password
      };
      request(app)
        .post("/users")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('"user not created"')
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
