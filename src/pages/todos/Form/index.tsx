import { ETodoPriority, InputType, ITodo } from '@/util/interfaces';
import { Form, Formik } from 'formik';
import Joi from 'joi';
import { useAppSelector } from '@/store';
import { validateForm } from '@/util/util';
import LinePic from '@/components/LinePic';
import Controller from '@/components/Btns/Controller';
import InputWRapper from '@/components/inputs/InputWRapper';
import CheckBoxBTN from '@/components/Btns/CheckBoxBTN';
import SelectBTN from '@/components/Btns/SelectBTN';
import TagInput from './TagInput';

type Props = {
    updated?: Partial<ITodo>;
    onSubmit: (value: ITodo) => void;
    onCancel: () => void;
};

const schema = Joi.object({
    title: Joi.string().trim().required().messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
    }),

    description: Joi.string().optional().allow('').messages({
        'string.base': 'Description must be a string',
    }),

    dueDate: Joi.date().iso().optional().messages({
        'date.base': 'Due date must be a valid ISO date string',
        'date.format': 'Due date must be in ISO 8601 format',
    }),

    completed: Joi.boolean().optional(),

    category: Joi.string().optional().messages({
        'string.base': 'Category must be a string',
    }),

    priority: Joi.string()
        .valid(...Object.values(ETodoPriority))
        .optional()
        .messages({
            'any.only': `Priority must be one of: ${Object.values(ETodoPriority).join(', ')}`,
        }),

    tags: Joi.array().items(Joi.string()).optional().messages({
        'array.base': 'Tags must be an array of strings',
        'string.base': 'Each tag must be a string',
    }),

    isActive: Joi.boolean().optional().messages({
        'boolean.base': 'isActive must be a boolean (true or false)',
    }),
});

const categories = [
    { label: 'General', value: 'general' },
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Health', value: 'health' },
    { label: 'Finance', value: 'finance' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Education', value: 'education' },
    { label: 'Travel', value: 'travel' },
    { label: 'Other', value: 'other' },
];

const priorities = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
];

const inputs: { name: string; type?: InputType }[] = [{ name: 'title' }, { name: 'description' }, { name: 'dueDate', type: 'date' }];

export default function TodosForm({ updated, onSubmit, onCancel }: Props) {
    const { loading, error } = useAppSelector(({ todos }) => todos.actions);
    const initialValues: ITodo = {
        title: updated?.title || 'Title 1',
        description: updated?.description || 'Description 1',
        priority: updated?.priority || ETodoPriority.MEDIUM,
        tags: updated?.tags || [],
        completed: updated?.completed ?? false,
        isActive: updated?.isActive ?? true,
        category: updated?.category || 'general',
        dueDate: updated?.dueDate || new Date(),
    };

    async function handleFormSubmit(payload: ITodo) {
        onSubmit(payload);
    }

    return (
        <div>
            <h2 className="mb-2 font-black text-dark text-xl">Todo list Form</h2>
            <LinePic />
            {error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                    <ul className="list-disc pl-5">
                        {error.map((error: string, index: number) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                ''
            )}
            <Formik initialValues={initialValues} validate={(v) => validateForm(v, schema)} initialTouched={{ title: true }} onSubmit={handleFormSubmit} validateOnChange={true}>
                {({ values, setFieldValue, errors, touched }) => (
                    <Form>
                        {inputs.map((input) => (
                            <InputWRapper key={input.name} {...input} />
                        ))}

                        <CheckBoxBTN
                            checked={!!values.completed}
                            onChange={(e) => {
                                setFieldValue('completed', e);
                            }}
                            label="Completed"
                        />

                        <SelectBTN
                            name="page"
                            options={categories}
                            onChange={(e) => {
                                setFieldValue('category', e);
                            }}
                            value={values.category || ''}
                        />

                        <SelectBTN
                            name="page"
                            options={priorities}
                            onChange={(e) => {
                                setFieldValue('priority', e);
                            }}
                            value={values.priority || ''}
                        />

                        <TagInput value={values.tags} onChange={(e) => setFieldValue('tags', e)} />

                        <CheckBoxBTN
                            checked={!!values.isActive}
                            onChange={(e) => {
                                setFieldValue('isActive', e);
                            }}
                            label="Active"
                        />
                        <Controller disabled={!!(Object.keys(errors).length || !Object.keys(touched).length)} onCancel={onCancel} loading={loading} onSubmit={() => handleFormSubmit(values)} />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
