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

//function gravar(d){
//	localStorage.setItem('despesa', JSON.stringify(d))
//}

//JSON.stringify(objeto) : converte para JSON

//JSON.parse(objeto) : converte para objeto literal 