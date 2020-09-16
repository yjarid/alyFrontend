const imageFromReviews = reviews => {
  let modalInfo = []

  console.log(reviews)

  if (Array.isArray(reviews)) {
    reviews.forEach(review => {
      let entity = review.author ? review.author : review.business
      review.picture.forEach(pic => {
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
          createdAt: review.createdAt
        }
        modalInfo.push(detailedInfo)
      })
    })
  } else {
    let entity = reviews.author ? reviews.author : reviews.business
    reviews.picture.forEach(pic => {
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
        createdAt: reviews.createdAt
      }
      modalInfo.push(detailedInfo)
    })
  }

  return modalInfo
}

export default imageFromReviews
