import { useRef } from "react"

export const feedConcat = data => {
  const followingsFeed = data.followings
  const yourFeed = data.recipient

  let feeds = []

  yourFeed.map(uf => {
    let feed = {
      type: "ur",
      id: uf._id,
      action: uf.action,
      createdAt: uf.createdAt,
      recipient: null,
      performer: uf.performer ? uf.performer : null,
      business: uf.business ? uf.business : null,
      image: uf.image ? uf.image : null,
      review: uf.review ? uf.review : null
    }

    feeds.push(feed)
  })

  for (const ff of followingsFeed) {
    for (const f of ff.user.performer) {
      let feed = {
        performer: ff.user,
        type: "follow",
        id: f._id,
        action: f.action,
        createdAt: f.createdAt,
        recipient: f.recipient ? f.recipient : null,
        business: f.business ? f.business : null,
        image: f.image ? f.image : null,
        review: f.review ? f.review : null
      }
      feeds.push(feed)
    }
  }

  feeds = getUnique(feeds, "id")
  feeds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return feeds
}

function getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e])

  return unique
}
