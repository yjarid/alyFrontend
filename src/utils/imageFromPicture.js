const imageFromPicture = pictures => {
  let modalInfo = []

  pictures.forEach(pic => {
    let entity = pic.author ? pic.author : pic.business
    let detailedInfo = {
      picId: pic._id,
      picture: pic.picture,
      picDesc: pic.desc ? pic.desc : null,
      picClaps: pic.claps || 0,
      picAlyScore: pic.alyScore || 0,
      id: entity._id,
      name: entity.userName || entity.name,
      profPic: entity.picture,
      nbrRev: entity.nbrRev,
      revPic: entity.revPic,
      createdAt: pic.createdAt
    }
    modalInfo.push(detailedInfo)
  })

  return modalInfo
}

export default imageFromPicture
