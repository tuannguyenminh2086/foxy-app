import { getServerSession } from '#auth'

export default defineEventHandler(async(event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  try {
    const config = useRuntimeConfig();
    const _user: any = session.user;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${_user.token}`
      }
    };

    let _params = {
      state: [1,2,3,4],
      isQuickRecord: false,
      assignedTo: _user.id,
    };
    
    // const qs = '?' + new URLSearchParams(_params).toString();

    

    const url = `${config.cmsUrl}/api/tasks/`;


  } catch (error) {
    
  }

  return {
    hello: 'world'
  }
})
