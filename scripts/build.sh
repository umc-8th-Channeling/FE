#!/bin/sh
set -e

echo "[INFO] 소스 코드 파일 복사를 시작합니다."

# 1. 루트 디렉토리에 이전 빌드 결과(output)가 남아있다면 삭제합니다.
echo "[1/3] 기존 output 폴더를 정리합니다..."
rm -rf output

# 2. 빌드 결과물을 담을 output 폴더를 루트 디렉토리에 새로 생성합니다.
echo "[2/3] 새로운 output 폴더를 생성합니다..."
mkdir output

# 3. 'output' 폴더를 제외한 모든 파일과 폴더를 복사합니다.
echo "[3/3] 소스 파일들을 output 폴더로 복사합니다..."
for item in *; do
  if [ "$item" != "output" ]; then
    cp -R "$item" "output/"
  fi
done

echo "--- 파일 복사가 성공적으로 완료되었습니다 ---"