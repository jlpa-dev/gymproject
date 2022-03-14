import { firebaseAuth } from 'src/boot/firebase'

async function authUser () {
  return new Promise((resolve) => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user)
      if (!user) {
        resolve(false)
      } else {
        resolve(user.emailVerified)
      }
    })
  })
}

export default authUser
