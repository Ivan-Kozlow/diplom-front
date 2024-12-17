interface IBase {
	id: string
}

export type TypeFormGetDescriptionFields = IBase

export type TypeFormCreateDescriptionFields = {
	description: string
} & IBase

export type TypeFormUpdateDescriptionFields = TypeFormCreateDescriptionFields
