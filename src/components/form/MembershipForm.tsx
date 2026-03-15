import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_BYTES = 1024 * 1024;

const membershipSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z.string().trim().email("Enter a valid email."),
  motherName: z.string().trim().min(1, "Mother's name is required."),
  fatherName: z.string().trim().min(1, "Father's name is required."),
  dob: z.string().trim().min(1, "Date of birth is required."),
  blood: z.string().trim().min(1, "Blood group is required."),
  house: z.string().trim().min(1, "House number is required."),
  gender: z.string().trim().min(1, "Gender is required."),
  address: z.string().trim().min(1, "Address is required."),
  joinYear: z.coerce.number().min(2000, "Join year is invalid.").max(2100, "Join year is invalid."),
  examName: z.string().trim().min(1, "Entrance exam is required."),
  college: z.string().trim().min(1, "College is required."),
  course: z.string().trim().min(1, "Course and branch are required."),
  duration: z.string().trim().min(1, "Course duration is required."),
  remarks: z.string().trim().optional(),
  lastSem: z.string().trim().min(1, "Last semester result is required."),
  twelfth: z.string().trim().min(1, "12th board/equivalent result is required."),
  tenth: z.string().trim().min(1, "10th board/equivalent result is required."),
  candPhone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid candidate contact number."),
  parentPhone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid parent contact number."),
  agreement: z
    .boolean()
    .refine((value) => value, { message: "Please accept the agreement to continue." })
});

type MembershipFormData = z.infer<typeof membershipSchema>;
type FileKey = "file1" | "file2" | "file3";

type FileState = {
  file: File | null;
  error: string;
};

const fileConfig: { key: FileKey; icon: string; title: string; subtitle: string }[] = [
  {
    key: "file1",
    icon: "📄",
    title: "College ID / Fee Receipt / Bonafide Certificate",
    subtitle: "Upload 1 file (PDF/JPG/PNG). Max 1 MB."
  },
  {
    key: "file2",
    icon: "🖼️",
    title: "Recent Passport Size Photo",
    subtitle: "Upload 1 file (PDF/JPG/PNG). Max 1 MB."
  },
  {
    key: "file3",
    icon: "✍️",
    title: "Full Signature of Applicant",
    subtitle: "Upload 1 file (PDF/JPG/PNG). Max 1 MB."
  }
];

const emptyFileState: Record<FileKey, FileState> = {
  file1: { file: null, error: "" },
  file2: { file: null, error: "" },
  file3: { file: null, error: "" }
};

function MembershipForm() {
  const [documents, setDocuments] = useState<Record<FileKey, FileState>>(emptyFileState);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm<MembershipFormData>({
    resolver: zodResolver(membershipSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      motherName: "",
      fatherName: "",
      dob: "",
      blood: "",
      house: "",
      gender: "",
      address: "",
      joinYear: 2025,
      examName: "",
      college: "",
      course: "",
      duration: "",
      remarks: "",
      lastSem: "",
      twelfth: "",
      tenth: "",
      candPhone: "",
      parentPhone: "",
      agreement: false
    }
  });

  const handleFileChange = (key: FileKey, selectedFile: File | null) => {
    setDocuments((prev) => {
      if (!selectedFile) {
        return {
          ...prev,
          [key]: { file: null, error: "This file is required." }
        };
      }

      if (selectedFile.size > MAX_FILE_BYTES) {
        return {
          ...prev,
          [key]: { file: null, error: "File too large (max 1MB)." }
        };
      }

      return {
        ...prev,
        [key]: { file: selectedFile, error: "" }
      };
    });
  };

  const allDocumentsValid = useMemo(
    () => Object.values(documents).every((document) => document.file && !document.error),
    [documents]
  );

  const agreementChecked = watch("agreement");
  const canSubmit = isValid && allDocumentsValid && agreementChecked && !isSubmitting;

  const formHint = !isValid
    ? "Please fill required fields and upload valid files (max 1MB)."
    : !agreementChecked
      ? "Please accept the agreement to continue."
      : !allDocumentsValid
        ? "Please upload all required documents."
        : "All set! You can proceed to payment.";

  const onSubmit = async (data: MembershipFormData) => {
    setSubmitMessage("");
    // Integrate your API and payment gateway here.
    await new Promise((resolve) => setTimeout(resolve, 700));
    console.info("Validated membership payload", {
      ...data,
      documents: Object.fromEntries(
        Object.entries(documents).map(([key, value]) => [key, value.file?.name ?? ""])
      )
    });
    setSubmitMessage("Form validated successfully. Proceed to your payment gateway.");
  };

  return (
    <section className="shell">
      <header className="topbar card">
        <h1>Navprayas&apos;25 Membership Form</h1>
        <p>A Platform To Learn, Grow, And Serve-Together.</p>
      </header>

      <section className="grid-2 intro">
        <div className="card hero-card">
          <h2>Join A Community Driven By Innovation, Service &amp; Social Responsibility.</h2>
          <p className="small">
            Please fill your details carefully. Keep your documents ready before you start. Your application
            will be processed after successful payment verification.
          </p>

          <div className="pill-grid">
            <div className="pill">
              <span>Membership Fee:</span> Rs 100
            </div>
            <div className="pill">
              <span>Validity:</span> 4 Years
            </div>
            <div className="pill">
              <span>Payment:</span> UPI/Debit/Credit
            </div>
            <div className="pill">
              <span>Uploads:</span> Max 1 MB Each
            </div>
          </div>
        </div>

        <div className="card rules-card">
          <h3>Eligibility</h3>
          <ol className="list">
            <li>One must be 10th pass out.</li>
            <li>One must be 12th pass out and must have attended at least one semester in college.</li>
            <li>If diploma then you have to be in 2nd year going to 3rd year of diploma course.</li>
            <li>This form is for freshers applicant only.</li>
          </ol>

          <h3 className="mt">Keep Following Documents Handy</h3>
          <ol className="list">
            <li>Passport size photo (up to 1 MB)</li>
            <li>Signature (up to 1 MB)</li>
            <li>Transaction screenshot (up to 1 MB)</li>
            <li>College ID card / fee receipt / bonafide certificate (up to 1 MB)</li>
            <li>10th result</li>
            <li>12th result or equivalent (e.g. Diploma)</li>
            <li>Last semester result</li>
          </ol>
        </div>
      </section>

      <form className="form card" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="section-head">
          <h2>Personal Details</h2>
          <p>Use official details. Names should be without salutations (Mr/Ms).</p>
        </div>

        <div className="fields grid-2">
          <div className={`field ${errors.fullName ? "invalid" : ""}`}>
            <label htmlFor="fullName">
              Full Name (IN BLOCK LETTERS) <span className="req">*</span>
            </label>
            <input id="fullName" type="text" placeholder="eg. Your Name" {...register("fullName")} />
          </div>

          <div className={`field ${errors.email ? "invalid" : ""}`}>
            <label htmlFor="email">
              Email Address <span className="req">*</span>
            </label>
            <input id="email" type="email" placeholder="eg. example@gmail.com" {...register("email")} />
          </div>

          <div className={`field ${errors.motherName ? "invalid" : ""}`}>
            <label htmlFor="motherName">
              Mother&apos;s Name <span className="req">*</span>
            </label>
            <input id="motherName" type="text" placeholder="Mother&apos;s Name" {...register("motherName")} />
          </div>

          <div className={`field ${errors.fatherName ? "invalid" : ""}`}>
            <label htmlFor="fatherName">
              Father&apos;s Name <span className="req">*</span>
            </label>
            <input id="fatherName" type="text" placeholder="Father&apos;s Name" {...register("fatherName")} />
          </div>

          <div className={`field ${errors.dob ? "invalid" : ""}`}>
            <label htmlFor="dob">
              Date of Birth <span className="req">*</span>
            </label>
            <div className="input-icon">
              <input id="dob" type="date" {...register("dob")} />
              <span className="icon" aria-hidden="true">
                📅
              </span>
            </div>
          </div>

          <div className={`field ${errors.blood ? "invalid" : ""}`}>
            <label htmlFor="blood">
              Blood Group <span className="req">*</span>
            </label>
            <select id="blood" {...register("blood")}>
              <option value="">Choose</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className={`field ${errors.house ? "invalid" : ""}`}>
            <label htmlFor="house">
              House No. <span className="req">*</span>
            </label>
            <input id="house" type="text" placeholder="House/Flat No." {...register("house")} />
          </div>

          <div className={`field ${errors.gender ? "invalid" : ""}`}>
            <label htmlFor="gender">
              Gender <span className="req">*</span>
            </label>
            <select id="gender" {...register("gender")}>
              <option value="">Choose</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div className={`field span-2 ${errors.address ? "invalid" : ""}`}>
            <label htmlFor="address">
              Permanent Address <span className="req">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              placeholder="Street, Area, City, State, Pincode"
              {...register("address")}
            />
          </div>
        </div>

        <div className="sub-section">
          <div className="sub-head">
            <h2>Academic Information</h2>
            <p>Fill your college and course details. Keep it accurate to avoid rejection.</p>
          </div>

          <div className="fields grid-2">
            <div className={`field ${errors.joinYear ? "invalid" : ""}`}>
              <label htmlFor="joinYear">
                Year of Joining Navprayas <span className="req">*</span>
              </label>
              <input id="joinYear" type="number" min={2000} max={2100} {...register("joinYear")} />
            </div>

            <div className={`field ${errors.examName ? "invalid" : ""}`}>
              <label htmlFor="examName">
                Name of Entrance Exam (with year) <span className="req">*</span>
              </label>
              <input id="examName" type="text" placeholder="eg. JEE 2025/ CET 2025" {...register("examName")} />
            </div>

            <div className={`field ${errors.college ? "invalid" : ""}`}>
              <label htmlFor="college">
                College in which enrolled <span className="req">*</span>
              </label>
              <input id="college" type="text" placeholder="College Name" {...register("college")} />
            </div>

            <div className={`field ${errors.course ? "invalid" : ""}`}>
              <label htmlFor="course">
                Course &amp; Branch <span className="req">*</span>
              </label>
              <input
                id="course"
                type="text"
                placeholder="B.Tech CSE/ Diploma Mechanical"
                {...register("course")}
              />
            </div>

            <div className={`field ${errors.duration ? "invalid" : ""}`}>
              <label htmlFor="duration">
                Duration of Course <span className="req">*</span>
              </label>
              <input id="duration" type="text" placeholder="eg. 4 Years / 3 Years" {...register("duration")} />
            </div>

            <div className="field">
              <label htmlFor="remarks">Any Remarks (Optional)</label>
              <input id="remarks" type="text" placeholder="Optional Note" {...register("remarks")} />
            </div>

            <p className="note span-2">
              If result is not declared, mention <b>&quot;Result not declared&quot;</b> with reason.
            </p>

            <div className={`field ${errors.lastSem ? "invalid" : ""}`}>
              <label htmlFor="lastSem">
                Last Semester Result <span className="req">*</span>
              </label>
              <input
                id="lastSem"
                type="text"
                placeholder="Board - Year - % or CGPA - Division"
                {...register("lastSem")}
              />
            </div>

            <div className={`field ${errors.twelfth ? "invalid" : ""}`}>
              <label htmlFor="twelfth">
                12th Board / Equivalent Result <span className="req">*</span>
              </label>
              <input
                id="twelfth"
                type="text"
                placeholder="Board - Year - % or CGPA - Division"
                {...register("twelfth")}
              />
            </div>

            <div className={`field span-2 ${errors.tenth ? "invalid" : ""}`}>
              <label htmlFor="tenth">
                10th Board / Equivalent Result <span className="req">*</span>
              </label>
              <input
                id="tenth"
                type="text"
                placeholder="Board - Year - % or CGPA - Division"
                {...register("tenth")}
              />
            </div>
          </div>
        </div>

        <div className="sub-section">
          <div className="sub-head">
            <h2>Contact Information</h2>
            <p>Upload clear images or PDFs. Each file must be within 1 MB.</p>
          </div>

          <div className="fields grid-2">
            <div className={`field ${errors.candPhone ? "invalid" : ""}`}>
              <label htmlFor="candPhone">
                Candidate Contact No. (WhatsApp preferred) <span className="req">*</span>
              </label>
              <input id="candPhone" type="tel" placeholder="+91 123-456-7890" {...register("candPhone")} />
            </div>

            <div className={`field ${errors.parentPhone ? "invalid" : ""}`}>
              <label htmlFor="parentPhone">
                Parents Contact No. <span className="req">*</span>
              </label>
              <input id="parentPhone" type="tel" placeholder="+91 123-456-7890" {...register("parentPhone")} />
            </div>
          </div>
        </div>

        <div className="sub-section">
          <div className="sub-head">
            <h2>Upload Documents</h2>
            <p>Fill your college and course details. Keep it accurate to avoid rejection.</p>
          </div>

          <div className="upload-wrap">
            {fileConfig.map((document) => (
              <div className="upload-row" key={document.key}>
                <div className="upload-left">
                  <div className="u-ico">{document.icon}</div>
                  <div>
                    <div className="u-title">{document.title}</div>
                    <div className="u-sub">{document.subtitle}</div>
                  </div>
                </div>
                <div className="upload-right">
                  <input
                    className="file"
                    type="file"
                    id={document.key}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => {
                      const selectedFile = event.target.files?.[0] ?? null;
                      handleFileChange(document.key, selectedFile);
                    }}
                  />
                  <label className="file-btn" htmlFor={document.key}>
                    <span className="up">⤴</span>
                    <span className={`fname ${documents[document.key].error ? "file-error" : ""}`} data-file={document.key}>
                      {documents[document.key].file?.name ?? (documents[document.key].error || "No File Chosen")}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="agree">
            <div className="agree-top">
              <input id="agreeCheck" type="checkbox" className="agree-input" {...register("agreement")} />
              <label htmlFor="agreeCheck" className="agree-label">
                <span className="agree-box" />
                <span className="agree-title">I agree</span>
              </label>
            </div>
            <p className="agree-text">
              I declare that the information provided is true. I agree to follow the rules and values of Navprayas.
              I understand that any breach of trust or misconduct may result in disciplinary action or termination.
            </p>
            {errors.agreement && <p className="agree-error">{errors.agreement.message}</p>}
          </div>

          <div className="actions">
            <button type="submit" className="btn" disabled={!canSubmit}>
              {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </button>
            <p className="hint">{submitMessage || formHint}</p>
          </div>
        </div>
      </form>

      <footer className="foot-space" />
    </section>
  );
}

export default MembershipForm;
