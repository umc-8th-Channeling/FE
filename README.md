# channeling-frontend

[▶ 채널링 - Channeling](https://github.com/umc-8th-Channeling)

**Coding conventions are documented in [Rules.md](./Rules.md).**

## 💡 Project Overview

유튜브 채널 및 개별 영상 데이터를 AI로 분석해, 개선점과 트렌드 기반 콘텐츠 아이디어를 제공하는 솔루션입니다.  
초보 유튜버부터 전문 크리에이터, 브랜드 마케팅 팀까지 모두가 활용할 수 있는 맞춤형 리포트를 자동 생성합니다.

<img width="1200" alt="멋있는 채널링 페이지" src="https://github.com/user-attachments/assets/28e427e5-faba-4273-a3b4-8aa23674cf9e" />

<img width="1200" alt="채널링 메인 페이지" src="https://github.com/user-attachments/assets/ad801b4f-d1ff-4e59-b72b-3246c8d20f28" />

## ⚙️ Getting Started

1. Install Plugin at your IDE

-   [tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
-   [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. Move to the frontend directory

```bash
cd frontend
```

3. Install project dependencies

```bash
pnpm install
```

4. Run development server

```bash
pnpm run dev
```

After running this command, you can see the website at localhost:5173.

## 👥 Contributors

<div align="center">
<video src="https://github.com/user-attachments/assets/6c6d543e-2cbe-4914-b918-b4b62ab35e03"
       controls
       width="200"
       playsinline
       muted>
</video>

|                                                         **곰/김소원**                                                          |                                                         **하치/정윤빈**                                                          |                                                             **띵/장명준**                                                              |                                                              **정/김세정**                                                               |
| :----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/102126457?v=4" height=150 width=150> <br/> gomx3](https://github.com/gomx3) | [<img src="https://avatars.githubusercontent.com/u/130227391?v=4" height=150 width=150> <br/> drddyn](https://github.com/drddyn) | [<img src="https://avatars.githubusercontent.com/u/103755402?v=4" height=150 width=150> <br/> komascode](https://github.com/komascode) | [<img src="https://avatars.githubusercontent.com/u/203520708?v=4" height=150 width=150> <br/> sejeong223](https://github.com/sejeong223) |

</div>

## 🛠️ Tech Stacks

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /> <img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white" /> <img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=TanstackQuery&logoColor=white"> <img src="https://img.shields.io/badge/chartjs-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white"> <img src="https://img.shields.io/badge/motion-FFF31D?style=for-the-badge&logo=motion&logoColor=white">

-   **React + TypeScript + Vite:** 빠른 개발 사이클(HMR)과 타입 안정성으로 품질·생산성 확보
-   **TailwindCSS:** 유틸리티 클래스 기반으로 일관된 디자인과 빠른 스타일링
-   **Tanstack Query:** 서버 상태 캐시/동기화, `invalidateQueries`로 신선도 제어
-   **Zustand:** 로그인 플로우/모달 등 전역 UI 상태를 심플하게 관리
-   **Vercel:** 간편한 프론트 배포 및 프리뷰 환경
-   **ESLint/Prettier:** 팀 컨벤션과 자동 포맷팅으로 일관성 유지

## 📁 Project Structure

프론트엔드는 **라우트(페이지) 중심의 기능 단위 구조** 위에, 재사용 가능한 **레이어(components · hooks · lib · api · stores)** 를 분리해 구성했습니다.

```dockerignore
📦FE
┣ 📁.github                              # GitHub 설정
┃ ┣ 📁ISSUE_TEMPLATE                     # 이슈 템플릿
┃ ┗ 📁workflows                          # CI/CD 워크플로우
┣ 📁frontend                             # 프론트엔드 앱 루트
┃ ┣ 📁node_modules
┃ ┣ 📁public                             # 정적 자산
┃ ┃ ┣ 📁fonts                            # 웹 폰트
┃ ┃ ┗ 📁icons                            # 퍼블릭 아이콘/이미지
┃ ┣ 📁src
┃ ┃ ┣ 📁api                              # API 클라이언트
┃ ┃ ┣ 📁assets                           # 내부 에셋
┃ ┃ ┃ ┣ 📁ellipses                       # 그래픽
┃ ┃ ┃ ┣ 📁icons                          # UI 아이콘
┃ ┃ ┃ ┃ ┣ 📁chart
┃ ┃ ┃ ┗ 📁loading
┃ ┃ ┣ 📁components                       # 재사용 컴포넌트
┃ ┃ ┃ ┣ 📁chart                          # 차트 컴포넌트/플러그인
┃ ┃ ┃ ┣ 📁common                         # 공통 UI
┃ ┃ ┃ ┃ ┗ 📁navbar                       # 모바일/태블릿/데스크톱 Navbar
┃ ┃ ┣ 📁constants                        # 상수
┃ ┃ ┃ ┗ 📜key.ts                         # 키/상수 모음
┃ ┃ ┣ 📁hooks                            # 커스텀 훅
┃ ┃ ┃ ┣ 📁channel
┃ ┃ ┃ ┣ 📁library
┃ ┃ ┃ ┣ 📁main
┃ ┃ ┃ ┣ 📁my
┃ ┃ ┃ ┗ 📁report
┃ ┃ ┣ 📁layouts                          # 루트/공통 레이아웃
┃ ┃ ┃ ┗ 📁_components
┃ ┃ ┣ 📁lib                              # 유틸/매퍼/검증
┃ ┃ ┃ ┣ 📁mappers                        # API 매핑
┃ ┃ ┃ ┗ 📁validation
┃ ┃ ┣ 📁pages                            # 라우팅 페이지
┃ ┃ ┃ ┣ 📁auth                           # 인증(리다이렉트/모달)
┃ ┃ ┃ ┃ ┗ 📁_components
┃ ┃ ┃ ┣ 📁library                        # 라이브러리
┃ ┃ ┃ ┃ ┗ 📁_components
┃ ┃ ┃ ┣ 📁main                           # 메인
┃ ┃ ┃ ┃ ┗ 📁_components
┃ ┃ ┃ ┣ 📁my                             # 마이페이지
┃ ┃ ┃ ┃ ┗ 📁_components
┃ ┃ ┃ ┣ 📁report                         # 리포트 상세 페이지
┃ ┃ ┃ ┃ ┣ 📁_components
┃ ┃ ┃ ┃ ┃ ┣ 📁analysis
┃ ┃ ┃ ┃ ┃ ┣ 📁idea
┃ ┃ ┃ ┃ ┃ ┗ 📁overview
┃ ┃ ┃ ┣ 📁setting                        # 설정(프로필/동의/탈퇴)
┃ ┃ ┃ ┃ ┗ 📁_components
┃ ┃ ┣ 📁router                           # 라우터 설정
┃ ┃ ┣ 📁stores                           # Zustand 전역 상태
┃ ┃ ┣ 📁styles                           # 전역/유틸 CSS
┃ ┃ ┣ 📁types                            # 타입 선언
┃ ┃ ┣ 📁utils                            # 공통 유틸
┃ ┃ ┃ ┗ 📜format.ts
┃ ┃ ┣ 📜App.tsx
┃ ┃ ┣ 📜main.tsx
┃ ┃ ┗ 📜vite-env.d.ts
┃ ┣ 📜.env
┃ ┣ 📜.gitignore
┃ ┣ 📜.svg.d.ts
┃ ┣ 📜eslint.config.js
┃ ┣ 📜index.html
┃ ┣ 📜package.json
┃ ┣ 📜pnpm-lock.yaml
┃ ┣ 📜README.md
┃ ┣ 📜tsconfig.app.json
┃ ┣ 📜tsconfig.json
┃ ┣ 📜tsconfig.node.json
┃ ┣ 📜vercel.json
┃ ┗ 📜vite.config.ts
┣ 📁scripts                             # 스크립트(빌드/유틸)
┣ 📜.gitattributes
┣ 📜.gitignore
┣ 📜.prettierignore
┣ 📜.prettierrc
┣ 📜README.md                           # 루트 README
┗ 📜Rules.md                            # 컨벤션 문서
```

## 🐾 Frontend Architecture Flow

![프론트 아키텍처](https://github.com/user-attachments/assets/87ccbc0c-42aa-465a-93a4-26c756d85078)

## ✍️ Typography System Guide

프로젝트 전역에서 일관된 텍스트 스타일을 적용하기 위해 **타이포그래피 시스템**을 정의했습니다.  
모든 팀원은 `typo.css`에 정의된 클래스를 사용해야 하며, 상세 규칙과 클래스 레퍼런스는 [Typography.md](./frontend/src/styles/Typography.md)에서 확인할 수 있습니다.

## 🔫 Challenges & Solutions

<details>
  <summary>페이지네이션의 숫자가 음수로 나타나는 문제</summary>

-   **원인 분석**
    페이지 버튼은 “5개 단위 창(window)”로 보여주는데, `currentPage`가 이 창의 범위를 벗어났을 때 `startPage`를 재조정해주는 로직이 없으면, 좌우 화살표 클릭 시 **창 기준으로 계산된 값(예: `startPage - 1`)이 그대로 `onChangePage`로 전달**됩니다.
    특히 데이터 삭제 등으로 `totalItems`가 줄어들어 `totalPageCount`가 급격히 작아질 때, 이전에 보던 큰 페이지 번호가 남아 **`currentPage > totalPageCount`** 상태가 됩니다. 이 상태에서 좌측 이동을 반복하거나, 윈도우 앞쪽으로 순간 이동하면 `startPage`와 `currentPage`의 불일치가 커지고, 결국 **0이나 음수 페이지**가 계산되어 전달될 수 있습니다.
    요약하면, **(1) 윈도우 이동 동기화 부재 + (2) 페이지 경계값(1~totalPageCount) 클램핑 미흡**이 결합해 발생한 버그입니다.

-   **해결 방법**
    `currentPage`가 보이는 창의 경계를 벗어날 때 **자동으로 `startPage`를 재조정**하여, 항상 현재 페이지가 5개짜리 창 안에 들어오게 했습니다. (아래 로직이 핵심)

    ```tsx
    useEffect(() => {
        if (currentPage >= startPage + 5 && !noNext) {
            // 오른쪽 경계 초과 → 창 시작점을 현재 페이지로 이동
            setStartPage(currentPage)
        } else if (currentPage <= startPage - 1 && !noPrev) {
            // 왼쪽 경계 밖 → 현재 페이지가 창의 맨 앞에 오도록 이동
            setStartPage(currentPage - 4)
        }
    }, [noPrev, noNext, startPage, currentPage, setStartPage])
    ```

    이 로직을 넣으면, 좌우 화살표/번호 버튼으로 빠르게 이동하거나, 아이템이 줄어 총 페이지 수가 줄어드는 상황에서도 **윈도우와 현재 페이지가 항상 동기화**되어, `startPage - 1` 같은 계산이 **0 이하**로 떨어지는 경로가 차단됩니다.
    **재현 및 확인 과정:** 1. 데이터가 여러 페이지(예: 18개, 6개/페이지 → 총 3페이지)일 때 3페이지로 이동. 2. 일부 아이템 삭제로 `totalItems`를 7부터 12개 수준으로 줄여 총 페이지 수를 2로 축소. 3. 좌측 화살표/페이지 빠른 클릭 → (수정 전) 창/현재페이지 불일치로 0 또는 음수 페이지가 찍히는 로그 확인. 4. 위 `useEffect` 추가 후 동일 시나리오 재실행 → 음수 페이지 발생하지 않음, 보이는 버튼도 항상 1부터 유효 범위를 유지.

</details>

<details>
  <summary>텍스트 영역 글자 수 제한이 적용되지 않는 문제</summary>

-   **원인 분석**
    Textarea 컴포넌트가 maxLength를 선택값으로 받도록 되어 있는데, 일부 화면에서 이 값을 전달하지 않아 실제 <textarea>에 maxlength 속성이 잡히지 않았습니다. 자동 높이 조절 때문에 스크롤만 생겨 제한이 있는 것처럼 보였지만, 실제로는 무제한 입력이 가능했습니다.

-   **해결 방법**

    ```tsx
    import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

    interface TextareaProps {
        id: string // textarea 요소의 고유 id
        value: string // textarea의 값
        onChange: (value: string) => void // 사용자가 입력한 텍스트가 변경될 때 호출되는 함수
        placeholder?: string
        initialRows?: number // row 개수로 textarea 박스의 초기 높이를 지정할 수 있습니다. 디폴트는 1
        disabled?: boolean
        className?: string
        maxLength?: number
    }

    const Textarea = ({
        id,
        value,
        onChange,
        placeholder,
        initialRows = 1,
        children,
        disabled = false,
        maxLength,
        className,
    }: PropsWithChildren<TextareaProps>) => {
        const [isFocused, setIsFocused] = useState(false)
        const textareaRef = useRef<HTMLTextAreaElement>(null)

        // Desktop, Tablet: 5줄까지 textarea가 늘어납니다. 6줄 부터는 스크롤해서 확인합니다.
        // Mobile: 3줄까지 textarea가 늘어납니다. 4줄 부터는 스크롤해서 확인합니다.
        useEffect(() => {
            const textarea = textareaRef.current
            if (!textarea) return

            const handleResize = () => {
                textarea.style.height = 'auto'

                const isMobile = window.innerWidth <= 768
                const maxLines = isMobile ? 3 : 5
                const maxHeight = 32 * maxLines
                textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'
            }
            handleResize()

            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }, [value])

        return (
            <divclassName={`
                    flex flex-col w/full min-w-[240px] tablet:min-w-[540px] desktop:min-w-[744px] p-4 space-y-6
                    border placeholder-gray-600 bg-neutral-white-opacity10 rounded-2xl
                    transition duration-300 ${isFocused ? 'border-gray-400' : 'border-transparent'} ${className ?? ''}
                `}
            >
                <textarearef={textareaRef}
                    id={id}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    rows={initialRows}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="
                        w-full h-fit max-h-[120px] px-2 outline-none resize-none focus:placeholder-transparent
                        text-[14px] leading-[150%] tracking-[-0.35px] tablet:text-[16px] tablet:tracking-[-0.4px]
                    "
                />

                {children && <>{children}</>}
            </div>
        )
    }

    export default Textarea

    ```

    모달별 상수값(콘셉트 500자, 타겟 100자)을 **호출부에서 `maxLength`로 반드시 전달**하여 제한을 확실히 적용했습니다.

</details>

<details>
<summary>페이지 전체가 스켈레톤 처리되어 사용자가 답답함을 느끼게 되는 문제</summary>

-   **원인 분석**
    내 채널 페이지에서 데이터가 pending일 경우를 한 번에 관리하여 사용자에게 답답한 느낌을 주는 문제가 있었습니다.

-   **해결 방법**
    스켈레톤 컴포넌트를 Skeleton과 VideoSkeleton으로 분리하고, 채널 대시보드 정보와 비디오리스트의 pending 상태가 각각 관리되게 했습니다.

    ```tsx
    if (isMePending)
        return (
            <div>
                <Skeleton />
            </div>
        )
    if (isVideoPending || isShortsPending) return <VideoSkeleton />
    ```

</details>

<details>
  <summary>프로필 이미지 변경 후 사이드바에 즉시 반영되지 않고, 새로고침 시 설정 이미지가 사라지는 문제</summary>

-   **원인 분석**
    프로필 변경 직후에도 사이드바가 갱신 전 사용자 정보(캐시) 를 계속 참조했고, staleTime: Infinity로 자동 재요청이 없어 최신 이미지가 반영되지 않았습니다. 또한 캐시 무효화가 없어서 새로고침 시 화면별로 서로 다른 소스가 뒤섞이며 이전 이미지가 사라진 것처럼 보였습니다.

-   **해결 방법**

    ```tsx
    import { useQuery } from '@tanstack/react-query'
    import type { User } from '../../types/channel'
    import { fetchMyProfile as fetchMyProfileAPI } from '../../api/user'
    export const useFetchMyProfile = (enabled = true) =>
        useQuery<User, Error, User, [string]>({
            queryKey: ['my-profile'],
            queryFn: async () => (await fetchMyProfileAPI()).result,
            staleTime: Infinity,
            retry: false,
            enabled,
        })
    ```

    ```tsx
    // settings/ProfileImageUploader.tsx (프로필 이미지 변경 성공 시)
    import { useQueryClient } from '@tanstack/react-query'
    const queryClient = useQueryClient()

    const onSuccessUpdate = async () => {
    // 이미지 업로드/수정 성공 후 최신 정보로 동기화
    await queryClient.invalidateQueries({ queryKey: ['my-profile'] })
    }

    // components/Sidebar.tsx (사이드바와 설정 모두 같은 훅을 구독)
    import { useFetchMyProfile } from '../hooks/queries/useFetchMyProfile'
    const { data: me } = useFetchMyProfile()
    <img src={me?.profileImage ?? '/images/default.png'} alt="profile" />

    ```

    해당 문제를 해결하기 위해 hooks/queries 에 fetchMyProfile.tsx 파일을 만들어 프로필을 변경하면 invalidateQueries({queryKey: ['my-profile']})을 통해 캐시를 무효화한 후 fetchMyProfile.tsx가 API를 다시 불러와 최신 프로필 데이터를 가져오도록 설정했습니다

</details>

## 🤖 Gemini AI PR Review Automation Pipeline

저희 채널링에서는 보다 나은 코드를 위해 **Gemini AI를 PR 리뷰에 자동화**시켜 백엔드, 프론트엔드에서 사용하고 있습니다.

![프론트 재미나이](https://github.com/user-attachments/assets/99ee7953-1312-4c91-bc7e-67111d137eb5)
