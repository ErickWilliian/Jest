import {render, screen} from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'
describe("teste",()=>{
    it("Teste 1", ()=>{
        render(<App />)

        screen.getByText("Ola mundo")
    })
    it("TESTE 2",()=>{
        render(<App/>)

        const button = screen.getByRole("button",{name:"Click"})

        expect(button).toHaveStyle({backgroundColor:"red"})
    })
})