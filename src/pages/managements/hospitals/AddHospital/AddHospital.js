import { Controller, useForm } from 'react-hook-form';
import Input from '~/components/Form/components/Input';
import Editor from '~/components/Form/components/Editor';
import FileInput from '~/components/Form/components/FileInput';
import MultipleImage from '~/components/Form/components/MultipleImage';
import Button from '~/components/Button/Button';
import axios from 'axios';

function AddHospital() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleClick = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('strengths', data.strengths);
        formData.append('equipments', data.equipments);
        formData.append('address', data.address);
        formData.append('procedure', data.procedure);
        formData.append('image', data.image);
        data.descImages.forEach((img) => formData.append('descImages', img));
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        axios({
            method: 'post',
            url: 'http://localhost:3030/api/hospital/create',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => console.log(res.data.message));
        console.log(data);
    };
    return (
        <div className="w-full overflow-hidden">
            <h2>Add Hospital</h2>
            <div>
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            error={errors.name}
                            type="text"
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Name"
                            id="name"
                            placeholder="Name..."
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            error={errors.address}
                            type="text"
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Address"
                            id="address"
                            placeholder="Address..."
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="description"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Editor
                            error={errors.description}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Description"
                            id="description"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="strengths"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Editor
                            error={errors.strengths}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Strengths"
                            id="strengths"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="equipments"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Editor
                            height="200px"
                            error={errors.equipments}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Equipments"
                            id="equipments"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="procedure"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Editor
                            height="200px"
                            error={errors.procedure}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Procedure"
                            id="procedure"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="image"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FileInput
                            error={errors.image}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Image"
                            id="image"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="descImages"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MultipleImage
                            error={errors.descImages}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value}
                            name="Desc Images"
                            id="descImages"
                        />
                    )}
                />
                <Button onClick={handleSubmit(handleClick)} type="primary" size="full">
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default AddHospital;
