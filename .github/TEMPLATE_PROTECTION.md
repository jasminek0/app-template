# ⚠️ 템플릿 저장소 보호 안내

이 저장소는 **템플릿 저장소**입니다. 의도하지 않은 변경을 방지하기 위해 푸시가 자동으로 차단됩니다.

## 푸시 차단 메커니즘

Git pre-push hook이 설정되어 있어 일반적인 `git push` 명령은 차단됩니다.

## 템플릿 사용 방법

새 프로젝트를 시작할 때:

```bash
# 이 템플릿을 기반으로 새 프로젝트 생성
git clone https://github.com/jasminek0/app-template.git my-new-project
cd my-new-project

# 원격 저장소 변경
git remote remove origin
git remote add origin <새-프로젝트-저장소-URL>

# 새 프로젝트로 푸시
git push -u origin main
```

## 템플릿 저장소 업데이트가 필요한 경우

정말로 템플릿 저장소를 업데이트해야 하는 경우:

### Bash/Git Bash:
```bash
ALLOW_TEMPLATE_PUSH=1 git push
```

### PowerShell:
```powershell
$env:ALLOW_TEMPLATE_PUSH=1; git push; Remove-Item env:ALLOW_TEMPLATE_PUSH
```

### Windows CMD:
```cmd
set ALLOW_TEMPLATE_PUSH=1 && git push && set ALLOW_TEMPLATE_PUSH=
```

## 추가 보호 조치

1. **GitHub 저장소 설정**에서 템플릿 저장소로 표시
2. **브랜치 보호 규칙** 설정 (권장)
   - Settings → Branches → Add branch protection rule
   - Branch name pattern: `main`
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging

3. **저장소 설명**에 "⚠️ 템플릿 저장소 - 직접 푸시 금지" 명시
