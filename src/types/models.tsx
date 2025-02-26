export type Acquisition = {
  id?: number
  date: Date | undefined
  cryptoactif: string
  montantInvesti: number
  coursAchat: number
  quantiteAchetee: number
}

export type Transfer = {
  id?: number
  date: Date | undefined
  cryptoactif: string
  quantiteVendu: number
  pma: number
  prixCession: number,
  frais: number,
  pmvLatente: number,
  prixAcquisition: number,
}