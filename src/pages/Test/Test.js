import { useForm, Controller } from 'react-hook-form';
import FeildInput from '~/components/Form/components/FeildInput';
import Select from '~/components/Form/components/Select';
import FileInput from '~/components/Form/components/FileInput';
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
            <h1 style={errors.name && { color: 'red' }}>hi</h1>
            <Controller
                control={control}
                name="select"
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FileInput
                        error={errors.select}
                        onChange={(e) =>
                            e.target.value.startsWith('/') ? window.open(e.target.value) : onChange(e.target.value)
                        }
                        onBlur={onBlur}
                        selected={value}
                        name="Avatar"
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
