const useImageFromFeed = feed => {
  let modalInfo = []

  let detailedInfo = {
    picId: feed.image._id,
    picture: feed.image.picture,
    picDesc: feed.image.desc,
    picClaps: feed.image.claps || 0,
    id: feed.business._id,
    name: feed.business.name,
    profPic: feed.business.picture,
    nbrRev: feed.business.nbrRev,
    revPic: feed.business.revPic,
    createdAt: feed.image.createdAt
  }

  modalInfo.push(detailedInfo)

  return modalInfo
}

export default useImageFromFeed
