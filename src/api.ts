import { Env } from './types';

export async function getImage(id: string, env: Env) {
  return env.PIC_R2.get(`pic/${id}`)
}

export async function getImages(env: Env) { 
  const { results } = await env.PIC
    .prepare("SELECT * FROM images ORDER BY timestamp DESC")
    .bind()
    .all<{prompt: string, id: string }>();
  
  return results;
}

