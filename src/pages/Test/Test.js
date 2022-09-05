import { useForm, Controller } from 'react-hook-form';
import Select from '~/components/Form/components/Select';
import FileInput from '~/components/Form/components/FileInput';
import MultipleImage from '~/components/Form/components/MultipleImage';
import Editor from '~/components/Form/components/Editor';
function Test() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const handleClick = (data) => {
        console.log(data);
    };
    return (
        <div>
            <h1 style={errors.descImages && { color: 'red' }}>hi</h1>
            <Controller
                control={control}
                name="descImages"
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Editor
                        error={errors.descImages}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        name="descImages"
                        id="image"
                        multiple
                    />
                )}
            />

            <button onClick={handleSubmit(handleClick)}>Shit</button>
        </div>
    );
}

export default Test;
