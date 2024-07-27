function authenticate(jwt: any, cb: any) {
   if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
   cb()
}