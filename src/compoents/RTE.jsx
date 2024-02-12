import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1 text-gray-200'>{label}</label>}

        <Controller 
        name={name || "content"} 
        control={control}
        render={({field: {onChange}}) => ( //yaha pr onchange small letter me hosakta h sydd..
        <Editor 
        apiKey='u8cjgts07426xjmx6j684n4pzu9z9z1b2tqndfm5byb1i6ns'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks",
                "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor",
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onChange}
        />
        )}
        />
    </div>
  )
}

