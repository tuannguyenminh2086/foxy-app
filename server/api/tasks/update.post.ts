// import { getServerSession } from '#auth'

export default defineEventHandler(async(event) => {
  // const session = await getServerSession(event)

  // if (!session) {
  //   return { status: 'unauthenticated!' }
  // }

  // try {
  //   const config = useRuntimeConfig();
  //   const body = await readBody(event)

  //   const _user: any = session.user;
  //   const { tid, payload } = body;


    

  //   const requestOptions = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${_user.token}`
  //     },
  //     body: JSON.stringify(payload)
  //   };

  //   const url = `${config.cmsUrl}/api/tasks/${tid}`;
  //   const req = await fetch(url, requestOptions )

  //   const res = await req.json();

  //   if (res) {
  //     return { status: 'success', data: {...res.data} }
  //   }

  // } catch (error) {
  //   return { status: 'error', error };
  // }

})
