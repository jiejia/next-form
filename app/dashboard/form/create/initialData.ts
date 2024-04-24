
interface component {
   id: number;
   name: string;
   config : object[];
}

interface field {
   uuid: string;
   id: number;
   name: string;
   title: string;
   active: boolean;
}

export const initialData = {
   components: [
      {id: 1, name: "Input Text"},
      {id: 2, name: "Textarea"},
      {id: 3, name: "Select"},
      {id: 4, name: "Checkbox"},
      {id: 5, name: "Radio"}
   ],
   fields: [
      {uuid: "f3216f83-f6d8-4859-a388-aa7683a61251", id: 1, name: "Input Text", title : "Title", active: true},
   ],
};
