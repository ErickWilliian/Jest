import {render, screen} from '@testing-library/react'
import App from './App'

describe("teste",()=>{
    it("Teste 1", ()=>{
        render(<App />)

        screen.getByText("Ola mundo")
    })
})