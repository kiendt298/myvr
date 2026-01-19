"use client";

import { generateSlug, POST_STATUSES } from "@/app/(common)/_utils/constant";
import { BRIEF_SERVICES } from "@/app/(common)/_utils/service-info";
import { IPost } from "@/app/(server)/database/models/Post";
import { createPost, updatePost } from "@/app/(server)/services/postService";
import { faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation"; // Use this for accessing query params
import { useEffect, useMemo, useState } from "react";
import SubmitButtonWrapper from "../Wrappers/SubmitButtonWrapper";
import { toast } from "react-toastify";
import { slugifyTransform } from "../../_helpers/transform";

interface FormErrors {
  title?: string;
  title_url?: string;
  package_id?: string;
  content?: string;
  status?: string;
  likes?: string;
  views?: string;
}

export default function PostForm({
  postDetail,
}: {
  postDetail: IPost | undefined;
}) {
  const initForm = useMemo(
    () =>
      ({
        title: "",
        title_url: "",
        package_id: "",
        content: "",
        status: POST_STATUSES.NEW,
        likes: 0,
        views: 0,
      }) as IPost,
    [postDetail],
  );
  const [form, setForm] = useState<IPost>(initForm);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const postId = searchParams?.get("id");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(!!postId);

  // Fetch data if in "edit" mode
  useEffect(() => {
    if (postDetail) {
      setIsEditing(true);
      fetchPostDetail(postDetail);
    } else {
      setIsEditing(false);
    }
  }, [postDetail]);

  const fetchPostDetail = async (postDetail: IPost) => {
    // Pre-fill data
    setForm(postDetail);
    setHtmlContent(postDetail?.content || "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [name]: value,
      };

      // If the 'title' field changes, update the 'title_url' field
      // Only auto update incase create new post.
      // When editing post, show more checkbox to prevent the current url will be auto updated (impact SEO)
      if (name === "title" && !isCheckboxChecked) {
        updatedForm.title_url = slugifyTransform(value);
      }

      return updatedForm;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsCheckboxChecked(isChecked);

    if (isChecked) {
      // If checked, freeze the current title_url value
      setForm((prevForm) => ({
        ...prevForm,
        title_url: prevForm.title_url, // Keep title_url as is
      }));
    }
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    let postDetail: IPost | undefined;
    try {
      if (!isEditing) {
        postDetail = await createPost({
          ...form,
          content: htmlContent,
        } as IPost);
        setForm(initForm);
        toast.success("Tạo bài viết thành công");
      } else {
        postDetail = await updatePost({
          ...form,
          content: htmlContent,
        } as IPost);
        setForm({
          ...form,
        });
        toast.success("Cập nhật bài viết thành công");
      }
    } catch (error: any) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
      return;
    }

    // Open new tab for public post if status is public
    if (form.status === POST_STATUSES.PUBLIC) {
      window.open(
        `/cau-chuyen/${form.title_url}-${postDetail.simplified_id}`,
        "_blank",
      );
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!form.title) errors.title = "Tiêu đề không được bỏ trống!";
    if (!form.package_id) errors.package_id = "Hãy chọn 1 gói dịch vụ!";
    return errors;
  };

  // Load CKEditor
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "/libs/ckeditor/ckeditor.js";

      script.onload = () => {
        const win = window as any;

        // setTimeout(() => {
        if (win.CKEDITOR) {
          win.CKEDITOR.replace("editor", {
            on: {
              change: (e: any) => {
                const newContent = e.editor.getData();
                setHtmlContent(newContent);
              },
            },
          });
        } else {
          console.error("CKEditor did not load properly");
        }
        // }, 1000);
      };

      document.body.appendChild(script);

      // Clean up the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-[#96694f] uppercase font-sans text-shadow-light text-center mt-8 mb-4">
        WELCOME ADMIN!
      </h1>

      <div className="flex items-center mb-4">
        <a
          href="/ead/home"
          className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors mr-4 py-2 px-3"
        >
          <FontAwesomeIcon icon={faHomeAlt} className="w-4 h-4" />
        </a>
        <h2 className="text-3xl font-extrabold text-gray-600 uppercase font-sans">
          {isEditing ? "CẬP NHẬT BÀI VIẾT" : "TẠO BÀI VIẾT"}
        </h2>
      </div>

      <form action={handleSubmit} className="flex gap-8 text-gray-700">
        {/* Left Side - Create Post Form */}
        <div className="w-1/2 h-full bg-gradient-to-b to-gray-100 from-gray-300 p-4 rounded-lg pb-16">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="font-semibold text-gray-600">Tiêu đề:</label>
              <input
                type="text"
                name="title"
                value={form?.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  !form?.title && formErrors.title
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {!form?.title && formErrors.title && (
                <p className="text-red-500 mt-1 text-sm">{formErrors.title}</p>
              )}
            </div>

            {/* Title URL */}
            <div>
              <label className="font-semibold text-gray-600">
                Đường link tiêu đề:
              </label>
              {postId && (
                <label className="inline-flex items-center ml-2">
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  Không thay đổi
                </label>
              )}
              <input
                type="text"
                name="title_url"
                value={form.title_url}
                onChange={handleChange}
                disabled={isCheckboxChecked}
                className={`w-full px-3 py-2 border ${
                  !form.title_url ? "border-red-500" : "border-gray-300"
                } rounded mt-2`}
              />
            </div>

            {/* Service and Status */}
            <div className="flex gap-8">
              <div className="w-1/2">
                <label className="font-semibold text-gray-600">
                  Nội dung liên quan
                </label>
                <select
                  name="package_id"
                  value={form?.package_id}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    !form?.package_id && formErrors.package_id
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                >
                  <option disabled value="">
                    Chọn dịch vụ
                  </option>
                  {BRIEF_SERVICES.map((item) => {
                    return (
                      <option value={item?.id} key={item?.id}>
                        {item?.title}
                      </option>
                    );
                  })}
                </select>
                {!form?.package_id && formErrors.package_id && (
                  <p className="text-red-500 mt-1 text-sm">
                    {formErrors.package_id}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <label className="font-semibold text-gray-600">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={form?.status}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    !form?.status && formErrors.status
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                >
                  {Object.values(POST_STATUSES).map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-1/2">
                <label className="font-semibold text-gray-600">
                  Lượt thích
                </label>
                <input
                  type="number"
                  name="likes"
                  value={form.likes}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    !form.likes ? "border-red-500" : "border-gray-300"
                  } rounded mt-2`}
                />
              </div>
              <div className="w-1/2">
                <label className="font-semibold text-gray-600">Lượt xem</label>
                <input
                  type="number"
                  name="views"
                  value={form.views}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    !form.views ? "border-red-500" : "border-gray-300"
                  } rounded mt-2`}
                />
              </div>
            </div>

            {/* CKEditor */}
            <div>
              <label className="font-semibold text-gray-600">
                Nội dung:{" "}
                <span className="font-normal">
                  (F5 nếu không thấy bảng soạn thảo)
                </span>
              </label>
              <textarea
                id="editor"
                value={form?.content}
                onBlur={(e: any) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    content: e.editor.getData(),
                  }));
                }}
              ></textarea>
            </div>
          </div>

          <div className="text-right mt-8 flex justify-between item-center">
            <SubmitButtonWrapper className="bg-blue-600 text-white px-12 py-2 rounded">
              {isEditing ? "CẬP NHẬT BÀI VIẾT" : "TẠO BÀI VIẾT"}
            </SubmitButtonWrapper>

            {/* Back to post list*/}
            <a
              href="/ead/posts"
              className="text-right mt-4 text-blue-500 underline"
            >
              Quay lại admin Posts
            </a>
          </div>
        </div>

        {/* Right Side - Post Details */}
        <div className="w-1/2">
          <div className="space-y-4 bg-white p-8 rounded-lg border border-gray-200 shadow-md">
            <div>
              <h4 className="font-semibold text-2xl text-center main-color">
                {form?.title || "- Tiêu đề câu chuyện -"}
              </h4>
            </div>

            <div
              className="cus-ckeditor-styles"
              style={{ minHeight: "650px" }}
              dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
            ></div>
          </div>
        </div>
      </form>
    </>
  );
}
