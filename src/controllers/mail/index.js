module.exports = {
  body: (Message,Cliente, Telefone, Email) => { return `


  <style>
  .container{
    width: 800px;
    justify-content: center;
    align-items: center;
    align-content: center;
    display:flex;
    flex-direction:column;
  }

  .value{
    padding:10px;
    background-color: #8257e6;
    color: #fff;
    border-radius: 6px;
    width: 15px;
    text-align: center;
    margin-left: 2px;
    text-decoration: none;
  }
.level{
  display: flex;
  margin: 10px;
  justify-content: space-between;
  width: 350px;
}
.answers{
  width: 350px;
  display: flex;
  justify-content: space-between;

}
</style>

<div class='container'>
  <label>Olá <strong>${Cliente}</strong>! Tudo Bem?</label> 
  <p>Seu email foi enviado e logo será respondido no email abaixo ou entraremos em contato pelo telefone de contato:</p>
  <br/>
  <h3>EMAIL: ${Email}</h3>
  <strong>TELEFONE: ${Telefone}</strong>

  <hr />

  <div class='level'>
    <span>MENSAGEM:</span>

  </div>

<div class='answers'>
  <p class="value">${Message}</p>
</div>
  <br/>
  <br/>

  <strong>Sua opnião é muito importante para nós</strong>
  <h3>Equipe <strong>NovaPay</strong></h3>
</div>



    `
  }
}