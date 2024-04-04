import { createClient } from "@supabase/supabase-js";
import {message} from 'antd';
const supabaseUrl ="https://lfuugdxzrvljgtkzairs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdXVnZHh6cnZsamd0a3phaXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NTA2OTEsImV4cCI6MjAyNjAyNjY5MX0.P16gZz3SoCDP17KS5hOCsv7EBMX-nrM3Q0b-lrL3TYA"

export const supabase = createClient(supabaseUrl, supabaseKey);


export const uploadimageToSupabase = async (file: any,name:any) => {
        
    const fileName = String(name);
    console.log(fileName);
    const { data, error } = await supabase.storage
        .from('pic')
        // upload the file with the email as the name
        .upload(fileName, file, {
            cacheControl: '60',
            upsert: true,
            
        });
    if(data){
       // message.success('Image uploaded successfully');
       message.success({
        content: 'Image uploaded successfully',
        duration: 3, // Display duration in seconds
        style: {
          marginTop: '10vh', // Adjust vertical position
        },
      });
      message.warning({
        content: 'Please wait for the image to load completely it may take some time',
        duration: 6, // Display duration in seconds
        style: {
          marginTop: '10vh', // Adjust vertical position
        },
      });

    }
    if(error){
        //message.error(error.message);
        message.error({
            content: error.message,
            duration: 3, // Display duration in seconds
            style: {
              marginTop: '10vh', // Adjust vertical position
            },
          });
    }
    return
    
}
export const getImageFromSupabase = async (name: any) => {

    const { data, } = await supabase.storage
        .from('pic')
        .getPublicUrl(name);
    if(data){
        
        return data.publicUrl;
    }
    
}
export const deleteImageFromSupabase = async (name: any) => {
    const { data, error } = await supabase.storage
        .from('pic')
        .remove([name]);
    if(data){
        message.success('Image deleted successfully');
    }
    if(error){
        message.error(error.message);
    }
    return
}
