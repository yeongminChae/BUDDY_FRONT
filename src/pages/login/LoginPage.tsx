import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { unwrapApiResponse } from "../../features/client-common/unwrapApiResponse";
import { AppShell } from "../../shared/ui/app-shell/AppShell";
import { AppHeader } from "../../shared/ui/app-header/AppHeader";
import { PageTitle } from "../../shared/ui/page-title/PageTitle";
import { SectionBlock } from "../../shared/ui/section-block/SectionBlock";
import { BuddyInput } from "../../shared/ui/buddy-input/BuddyInput";
import { BottomActionBar } from "../../shared/ui/bottom-action-bar/BottomActionBar";
import { BuddyButton } from "../../shared/ui/buddy-button/BuddyButton";
import { login } from "../../features/login/api/login";

type AdminLoginForm = {
  loginId: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginForm>({
    defaultValues: {
      loginId: "",
      password: "",
    },
  });

  const onSubmit = async (form: AdminLoginForm) => {
    try {
      const response = await login({
        loginId: form.loginId,
        password: form.password,
      });

      const data = unwrapApiResponse(response);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") {
        navigate("/admin/sessions");
        return;
      }

      window.alert("관리자 계정이 아닙니다.");
      navigate("/login");
    } catch (error) {
      console.error("로그인 실패", error);
      window.alert("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <AppShell hasBottomBar>
      <AppHeader showBackButton title="Buddy" onBack={() => navigate("/")} />
      <PageTitle title="어드민 로그인" subtitle="관리자만 접근할 수 있어요." />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-32 space-y-6">
          <SectionBlock title="로그인 정보">
            <div className="space-y-3">
              <BuddyInput
                placeholder="아이디"
                {...register("loginId", {
                  required: "아이디를 입력해주세요.",
                })}
              />
              {errors.loginId != null && (
                <p className="text-sm text-buddyDanger">
                  {errors.loginId.message}
                </p>
              )}

              <BuddyInput
                type="password"
                placeholder="비밀번호"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                })}
              />
              {errors.password != null && (
                <p className="text-sm text-buddyDanger">
                  {errors.password.message}
                </p>
              )}
            </div>
          </SectionBlock>
        </div>

        <BottomActionBar>
          <div className="grid grid-cols-1 gap-3">
            <BuddyButton fullWidth type="submit" disabled={isSubmitting}>
              로그인
            </BuddyButton>

            <BuddyButton
              fullWidth
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              취소
            </BuddyButton>
          </div>
        </BottomActionBar>
      </form>
    </AppShell>
  );
}
