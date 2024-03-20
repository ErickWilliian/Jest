# Jest e Testing Library



## O que são testes 

- Testes são uma forma de garantrimos o funioncamneto correto do nosso código
- Como eles são automatizados, testamos vários cenários com apenas um comando

> Existem 3 tipos de testes 
- Testes Unitários 
- Testes de integração
- Testes  end-to-end (E2E)
## Iniciando
- `npm create vite@latest . -- --template`  iniciando projeto
- `npm install jest -D` instalando o jest
- `npm i @swc/core @swc/jest -D`
- `npm install --save-dev @testing-library/react` instalando o Testing Library
> TS
-  npx jest --init
- `npm i ts-node @testing-library/jest-dom @testing-library/react jest-environment-jsdom identity-obj-proxy @testing-library/user-event -D` para funcionar o typescript

- `npm i --save-dev @types/jest`

- Depois disso tudo, colocar um script no package.json: `"test:"jest""` 

## Arquivo:

- Geralmente quando se cria um arquivo em jest você precisa colocar o .spec ou .test
- Desta forma `button.spec.ts`  


## Testes Unitários 

- São testes onde testamos apenas um componente / unidade de código
- Nesses testes, não chamamos agentes externos, como APIs
  - Caso este seja o caso, efetuaremos um `mock` desse agente (API)

```js
// Esse describe funciona para guardar os testes de um determinado componente

describe("Greeting component",()=>{

  // O 'it' é um teste e ele funciona meio como uma pergunta 
  // "it" - "ele" e o primeiro param ele pede uma mensagem para ser mostrada
  // e depois uma função que vai ser executada
  it('displays the correct greeting massage', () =>{

    // esse geByText é uma função di jest que vai pegar o texto do componente renderizado
    // então o jest vai renderizar o compoenente 
    const { getByText } = render(<Greeting name="Erick"/>)

    const greetingText = getByText(/Hello, Erick !/)


    expect(greetingText).toBeInTheDocument();
  })

})

```

## Testes de integração
- São testes onde testamos apenas dois ou mais componentes trabalhando em conjunto
- Nesses testes, tamém realizamos mocks de agentes externos 

```js
// Componente 1
function Greeting(props){
  return <h1>{props.text}</h1>
}

function GreetingContainer(){
  const [greetingText,setGreetingText] = useState("Hello World")

  function handleButtonClick(){
    setGreetingText("Text changed !")
  }
  return (
    <div>
      <Greeting text={greetingText}>

      <button onClick={handleButtonClick}>Change Text</button>
    </div>
  )
}

```

```js

describe("GreetingContainer component",()=>{
  it('changes Greeting text on button click', ()=>{
    // Aqui eu estou renderizando o compoenente inteiro e pegando uma função especifica dele
    // Que é o getByText
    const { getByText } = render(<GreetingCointainer />)

    // Essa função serve para procurar um elemento dentro do componente com o texto escolhido
    const buttonElement = getByText('Change Text')

    //Ai então eu disparo um evento de click
    fireEvent.click(buttonElement)

    // Aqui eu procuro algo que tenha essa string
    // lembra da função no segundo compoenente?
    // que se eu clicasse ele ia trocar o texto para 'Text changed !'
    // então ele vai procurar caso ele n ache ele retorna NULL
    const  updateGreetingElement = getByText('Text changed !')

    // o expect é uma função que testa o que ta dentro dos parenteses
    // e se ela dar erro o teste falha
    expect(updateGreetingElement).toBeInTheDocument()
  })
})

```

## Testes E2E
- São testes onde testamos fluxos completos do usuário
- Nesses testes, nos comunicamos com APIs e banco de dados reais 
- Podem levar muito mais tempo para serem executados dependedo do fluxo testado
- Uma ferramenta bem popular é o cypress



## Testing Library
- O jest não consegue testar compoenentes então chega o testing library para dar um super poder para o jest
- Somente com ele você consegue testar compoenentes
```js
// observação muito importante que quando você for testar um componente
// o arquivo tem que ter a extenção jsx ou tsx para que ele funcione 


// O "render" serve para renderizar o componente selecionado
// O "screen" vai meio que pegar esse elemento que foi renderizado e vai fazer referencia nele
// ai você pode meio que usar funções especificas nele
// então resumindo o screen serve para meio que referenciar o objeto renderizado pelo render
import {render, screen} from '@testing-library/react'

describe("teste",()=>{
    it("Teste 1", ()=>{
        render(<App />)
        // aqui uma peculiaridade do getByText que ele serve
        // para pegar um elemento na parte renderizada pelo texto contido nele
        // e caso ele não ache ele vai dar erro diretamente e falhar o teste
        screen.getByText("Ola mundo")
    })
})

```
## Testes Automatizados
- De certa forma vamos simular um botão sendo clicado



```js
// Componente 1
function Greeting(props){
  return <h1>{props.text}</h1>
}

function GreetingContainer(){
  const [greetingText,setGreetingText] = useState("Hello World")

  function handleButtonClick(){
    setGreetingText("Text changed !")
  }
  return (
    <div>
      <Greeting text={greetingText}>

      <button onClick={handleButtonClick}>Change Text</button>
    </div>
  )
}

```
```js

describe("GreetingContainer component",()=>{
  it('changes Greeting text on button click', ()=>{
    // Aqui eu estou renderizando o compoenente inteiro e pegando uma função especifica dele
    // Que é o getByText
    const { getByText } = render(<GreetingCointainer />)

    // Essa função serve para procurar um elemento dentro do componente com o texto escolhido
    const buttonElement = getByText('Change Text')

    //Ai então eu disparo um evento de click
    fireEvent.click(buttonElement)

    // Aqui eu procuro algo que tenha essa string
    // lembra da função no segundo compoenente?
    // que se eu clicasse ele ia trocar o texto para 'Text changed !'
    // então ele vai procurar caso ele n ache ele retorna NULL
    const  updateGreetingElement = getByText('Text changed !')

    // o expect é uma função que testa o que ta dentro dos parenteses
    // e se ela dar erro o teste falha
    expect(updateGreetingElement).toBeInTheDocument()
  })
})

```
- Outra forma de fazer esse teste:
```js

import {render, screen,fireEvent} from "@testing-library/react"

describe("GreetingContainer component",()=>{
  it('changes Greeting text on button click', ()=>{
     render(<GreetingCointainer />)

    const button = screen.getByText(/Change Text/i)

    fireEvent.click(button)

    screen.getByText(/Text changed !/i)
    
  })
})

```