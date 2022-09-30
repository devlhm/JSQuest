import * as Chapter from "../../api/chapter";
export default async () => {
	let message: string = "";
	let status: number = 102;
	let data;

	const response: any = await Chapter.getAll().then((response) => {
		return response;
	});

	status = response.status;
	data = response.data;

	switch (status) {
		case 200:
			message = "Capítulos obtidos com sucesso";
			return { data, status, message };
		case 400:
			message = "Token inválido";
			break;
		case 401:
			message = "Token nulo";
			break;
		case 0:
			message = "Sem conexão com o servidor";
			break;
		default:
			message = "Erro desconhecido " + status;
	}

	return { status, message };
};
