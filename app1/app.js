class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}
}

class Bd{

	constructor(){
		let id = localStorage.getItem('id')

		if(id == null){
			localStorage.setItem('id', 0)
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d){
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){

		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++){

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))

			//existe a possibilidade de haver índices que forma pulados/removidos
			if(despesa === null){
				continue
			}

			despesas.push(despesa)

		}

		return despesas
	}
}

let bd = new Bd()


function cadastrarDespesa(){

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	)

	if(despesa.validarDados()){
		bd.gravar(despesa)
		//dialog de sucesso
		$('#modalRegistraDespesa').modal('show')
		$('#exampleModalLabel')
			.html('Sucesso na gravação')
			.closest('div')
			.removeClass('text-danger')
			.addClass('text-success')
		$('.modal-footer')
			.find('button')
			.html('Voltar')
			.removeClass('btn-danger')
			.addClass('btn-success')

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
		
	} else {
		// dialog de erro
		$('#modalRegistraDespesa').modal('show')
		$('#exampleModalLabel')
			.html('Atenção: Erro na gravação')
			.closest('div')
			.removeClass('text-success')
			.addClass('text-danger')
		$('.modal-footer')
			.find('button')
			.html('Voltar e corrigir')
			.removeClass('btn-success')
			.addClass('btn-danger')
	}
	
}

function carregaListaDespesas(){

	let despesas = Array()

	despesas = bd.recuperarTodosRegistros()

	//selecionando o elemento tbody	
	var listaDespesas = document.getElementById('listaDespesas')

	//percorrer o array despesas, listando cada despesa
	despesas.forEach(function(d){

		//criando a linha (tr)
		let linha = listaDespesas.insertRow()

		//criar as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		
		//ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
		}
		linha.insertCell(1).innerHTML = d.tipo

		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})


}

//function gravar(d){
//	localStorage.setItem('despesa', JSON.stringify(d))
//}

//JSON.stringify(objeto) : converte para JSON

//JSON.parse(objeto) : converte para objeto literal 