import {useForm} from "react-hook-form";

function InputUser() {
  const {
    register, 
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid }
  } =useForm();
  const onSubmit = (data) => console.log(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Enter boat parameters:</p>
      <div>
        <label>
        Speed (knots): 
          <input {...register("boat.speed")}
          type="text"
          />
        </label>
      </div>
      <div>
        <label>
        Beam (m):
          <input {...register("boat.beam")} 
          type="text"
          />
        </label>
      </div>
      <div>
        <label>
        Draft (m):
          <input {...register("boat.draft")} 
          type="text"
          />
        </label>
      </div>
      <div>
        <label>
          Length (m):
          <input {...register("boat.length")} 
          type="text"
          />
        </label>
      </div>

      <div>
      Manoeuvrability:
      <select{...register("boat.manoeuvrability")}>
          <option defaultValue="good">good</option>
          <option value="moderate">moderate</option>
          <option value="poor">poor</option>
      </select>
      </div>
    
      <button 
      type="submit"
      disabled={!isDirty && !isValid}
      onClick={handleSubmit}
      >Submit
      </button>
    </form>
  );
}

export default InputUser;

