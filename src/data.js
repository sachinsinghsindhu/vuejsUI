const data = {
    colDefs: [
        {
            label: 'Text Columns',
            width: '400px',
            type: 'text',
        },
        {
            label: 'Text',
            width: '400px',
            type: 'text',
        },
        {
            label: 'Input Column',
            width: '400px',
            type: 'input',
        },
        {
            label: 'Check to delete',
            width: '300px',
            type: 'checkbox',
        }
    ],
    data: [
        {
            id: '1',
            colData: ['Text1','Text1', 'Input1', true]
        },
        {
            id: '2',
            colData: ['Text2','Text1', 'Input2', false]
        },
        {
            id: '3',
            colData: ['Text3','Text1', 'Input3', true]
        },
        {
            id: '4',
            colData: ['Text4','Text1', 'Input4', false]
        }, 
    ]
};

export {data};