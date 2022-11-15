/* eslint-disable import/no-anonymous-default-export */
import * as Chapter from "../../api/chapter";
export default async ()=> {
	let message: string = "";
	let status: number = 102;
	let data: UserProgressI;

	const chapters = localStorage.getItem("chaptersResponse");
	const response: any = chapters !== null ? JSON.parse(chapters) : await Chapter.getAll()

	console.log(response);

	status = response.status;
	data = response.data as UserProgressI;

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

export interface LessonI {
	id: string,
	type: string,
	title: string,
	completed: boolean
}
export interface ChapterI {
	id: string
	data: {
		title: string,
		descriptions: string,
		lessons: LessonI[]
	}
}
export interface UserProgressI {
	chapters: ChapterI[]
}