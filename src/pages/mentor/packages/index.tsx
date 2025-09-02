import React, { useEffect, useState } from "react";
import { MentorLayout } from "../../../layout";
import {
  useCreateNewPackageMutation,
  useDeletePackageMutation,
  useGetMyPackagesQuery,
  useMentorProfileQuery,
  useUpdatePackageMutation,
} from "../../../redux/rtk-api";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLoading,
} from "react-icons/ai";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Select,
  Switch,
} from "@headlessui/react";
import { AlterBuddyLogo } from "../../../assets/logo";
import { AppButton, TextField } from "../../../component";
import { Formik } from "formik";
import {
  ICategoryProps,
  IPackagesProps,
  ISubPackagesProps,
  Package,
} from "../../../interface";
import { toast } from "react-toastify";

export const PackagesPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [subPackages, setSubPackages] = useState<ISubPackagesProps[]>([]);
  const [subPackageField, setSubPackagesField] = useState<ISubPackagesProps>({
    title: "",
    price: 0,
    time: "",
  });
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [selected, setSelect] = useState<{
    mode: "edit" | "delete";
    props: IPackagesProps;
  } | null>(null);

  const { data: profile } = useMentorProfileQuery();

  const { data, isError, error, isFetching, isLoading } =
    useGetMyPackagesQuery();
  const [
    NewPackage,
    {
      isError: isNewError,
      error: newError,
      data: newData,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess,
    },
  ] = useCreateNewPackageMutation();
  const [
    DeletePackage,
    {
      isError: isDeleteError,
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      data: deleteData,
    },
  ] = useDeletePackageMutation();
  const [
    UpdatePackage,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData,
    },
  ] = useUpdatePackageMutation();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isDeleteError) {
      console.log(deleteError);
    }
  }, [isDeleteError, deleteError]);

  useEffect(() => {
    if (isUpdateError) {
      console.log(updateError);
    }
  }, [isUpdateError, updateError]);

  useEffect(() => {
    if (isNewError) {
      const err = newError as any;
      if (err.data) {
        toast.error(err.data.message);
        setIsOpen(false);
        setSelect(null);
      } else {
        toast.error(err);
      }
    }
  }, [isNewError, newError]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.data);
      setIsOpen(false);
      setStatus(false);
    }
  }, [isUpdateSuccess, updateData?.data]);

  useEffect(() => {
    if (isNewSuccess) {
      toast.success(newData?.data);
      setIsOpen(false);
      setStatus(false);
    }
    if (selected?.mode === "delete") {
      setDeleteOpen(true);
    }
    if (selected?.mode === "edit") {
      setIsOpen(true);
    }
  }, [isNewSuccess, newData?.data, selected]);
  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData?.data);
      setDeleteOpen(false);
    }
  }, [isDeleteSuccess, deleteData?.data]);

  const handleSubmit = async (props: IPackagesProps) => {
    console.log(props);
    const data = {
      ...props,
      price: subPackages.reduce(
        (acc, service) => acc + service.price,
        props.price
      ),
      subServices: subPackages,
    };
    console.log(data);
    if (selected?.mode === "edit") {
      await UpdatePackage({ _id: selected.props._id, ...data });
    } else {
      await NewPackage({ ...data });
    }
  };

  const onDelete = () => {
    if (selected.mode === "delete") {
      DeletePackage(selected.props._id);
    }
  };

  const filteredPackages = data?.data?.filter((pkg) =>
    pkg?.packageName?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <MentorLayout>
      {isFetching || isLoading ? (
        <AiOutlineLoading
          size={100}
          className="animate-spin text-primary-500"
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Packages</h1>
            <AppButton outlined onClick={() => setIsOpen(true)}>
              New Packages
            </AppButton>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search package by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-96 border px-4 py-2 rounded-md"
            />
          </div>

          <div className="grid xl:lg:grid-cols-3 md:grid-cols-6 sm:grid-cols-12 grid-cols-12 gap-5">
            {filteredPackages?.map(({ ...props }, i) => (
              <div
                className="border-2 border-primary-500 border-opacity-50 p-3"
                key={i}
              >
                <h6 className="text-2xl font-semibold">{props?.packageName}</h6>
                <p className="uppercase text-gray-500">
                  {(props?.categoryId as ICategoryProps)?.title} |{" "}
                  {props?.packageType}
                </p>
                <div className="flex justify-end">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(props.price)}{" "}
                  /min
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    className="text-gray-500"
                    onClick={() => setSelect({ mode: "edit", props })}
                  >
                    <AiOutlineEdit size={22} />
                  </button>
                  <button
                    type="button"
                    className="text-gray-500"
                    onClick={() => setSelect({ mode: "delete", props })}
                  >
                    <AiOutlineDelete size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        style={{ zIndex: 20 }}
        className="fixed inset-0 overflow-y-scroll flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <Formik
          onSubmit={handleSubmit}
          initialValues={
            {
              categoryId:
                (selected?.props?.categoryId as ICategoryProps)?._id || "",
              mentorId: selected?.props?.mentorId || "",
              packageName: selected?.props?.packageName || "",
              packageType: selected?.props?.packageType || "audio",
              price: selected?.props?.price || 0,
              status: selected?.props?.status || status,
            } as IPackagesProps
          }
          enableReinitialize
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogPanel className="max-w-lg space-y-4 bg-white p-5 mt-20">
                <DialogTitle className="font-bold text-2xl font-libre">
                  Select the details
                </DialogTitle>
                <Description className="text-gray-500 text-sm">
                  This will add the package to your account, allowing users to
                  utilize it when scheduling voice, video, or chat sessions.
                </Description>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-0">
                    <label
                      htmlFor="package_type"
                      className="capitalize group-hover:text-primary-500 text-gray-500 font-light"
                    >
                      Select Category to Make Package
                    </label>
                    <Select
                      onChange={(event) => {
                        setFieldValue("categoryId", event.target.value);
                        setSelectedCategoryName(
                          (profile?.data.category as ICategoryProps[]).find(
                            (prop) =>
                              (prop as ICategoryProps)._id ===
                              event.target.value
                          )?.title
                        );
                      }}
                      value={values.categoryId as string}
                      className="border-2 px-5 py-2 rounded-md focus:outline-none focus:border-primary-500 capitalize"
                      name="Select Category to Make Package"
                      aria-label="Project status"
                    >
                      <option value="" selected disabled>
                        None
                      </option>
                      {(profile.data.category as ICategoryProps[]).map(
                        ({ title, _id }, i) => (
                          <option key={i} value={_id}>
                            {title}
                          </option>
                        )
                      )}
                    </Select>
                  </div>
                  <TextField
                    value={values.packageName}
                    onChange={handleChange("packageName")}
                    onBlur={handleBlur("packageName")}
                    touched={touched.packageName}
                    error={errors.packageName}
                    label="Package Name"
                    outlined
                  />
                  {Array.isArray(subPackages) &&
                    subPackages.map((element, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <p>{element.title}</p>
                        <div className="flex gap-3 items-center">
                          <p>
                            {element.price.toLocaleString("en-IN", {
                              currency: "INR",
                              style: "currency",
                              notation: "standard",
                            })}
                          </p>
                          <button
                            className="text-red-500"
                            onClick={() => {
                              setSubPackages((prevSubPackages) =>
                                prevSubPackages.filter(
                                  (subPackage) => subPackage !== element
                                )
                              );
                            }}
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      </div>
                    ))}
                  {selectedCategoryName === "healer" && (
                    <div className="flex flex-col gap-2">
                      <div>
                        <TextField
                          outlined
                          label="Sub Package Title"
                          value={subPackageField?.title}
                          onChange={(prop) => {
                            setSubPackagesField({
                              ...subPackageField,
                              title: prop.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <TextField
                          type="number"
                          outlined
                          label="Sub Package Time"
                          value={subPackageField?.time}
                          onChange={(prop) => {
                            setSubPackagesField({
                              ...subPackageField,
                              time: prop.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <TextField
                          type="number"
                          outlined
                          label="Sub Package Price"
                          value={subPackageField?.price}
                          onChange={(prop) => {
                            setSubPackagesField({
                              ...subPackageField,
                              price: parseInt(prop.target.value),
                            });
                          }}
                        />
                      </div>
                      <AppButton
                        outlined
                        type="button"
                        onClick={() => {
                          if (
                            !subPackageField.title ||
                            !subPackageField.price
                          ) {
                            return null;
                          } else {
                            setSubPackages((prevSubPackages) => [
                              ...prevSubPackages,
                              {
                                price: subPackageField.price,
                                title: subPackageField.title,
                                time: subPackageField.time,
                              },
                            ]);
                            console.log(subPackages);
                            setSubPackagesField({
                              title: "",
                              price: 0,
                              time: "",
                            });
                          }
                        }}
                      >
                        Add Sub Package
                      </AppButton>
                    </div>
                  )}

                  <TextField
                    value={values.price}
                    onChange={handleChange("price")}
                    onBlur={handleBlur("price")}
                    touched={touched.price}
                    error={errors.price}
                    type="number"
                    label="Package Price(per min)"
                    outlined
                  />
                  <div className="flex flex-col gap-0">
                    <label
                      htmlFor="package_type"
                      className="capitalize group-hover:text-primary-500 text-gray-500 font-light"
                    >
                      Select Package Type
                    </label>
                    <Select
                      value={values.packageType}
                      onChange={handleChange("packageType")}
                      className="border-2 px-5 py-2 rounded-md focus:outline-none focus:border-primary-500 capitalize"
                      name="Package Options"
                      aria-label="Project status"
                    >
                      {Package.map((props, i) => (
                        <option key={i} value={props}>
                          {props}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Switch
                      id="status"
                      name="status"
                      checked={values.status}
                      onChange={() => setFieldValue("status", !values.status)} // Use Formik's setFieldValue
                      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary-600"
                    >
                      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                    </Switch>
                    <label
                      htmlFor="status"
                      className="text-gray-500 select-none"
                    >
                      Active as upload
                    </label>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <AppButton onClick={() => setIsOpen(false)} type="button">
                    Cancel
                  </AppButton>
                  <AppButton
                    type="submit"
                    outlined
                    loading={isNewLoading || isUpdateLoading}
                  >
                    Save Package
                  </AppButton>
                </div>
              </DialogPanel>
            </form>
          )}
        </Formik>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
            <DialogTitle className="font-bold">
              Delete {selected?.props.packageName}
            </DialogTitle>
            <Description>
              This will permanently {selected?.props.packageName} from your
              account
            </Description>
            <p>
              Are you sure you want to delete this from your account? This
              Package will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteOpen(false)}>Cancel</button>
              <button onClick={onDelete}>
                {isDeleteLoading ? "Deleteing..." : "Confirm"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </MentorLayout>
  );
};
