#!/bin/bash

# 개발환경 Docker 컨테이너 관리 스크립트

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_DIR="$SCRIPT_DIR/../docker"

cd "$DOCKER_DIR"

case "${1:-help}" in
  "up")
    echo "🚀 개발환경 시작..."
    docker-compose -f docker-compose.dev.yml up -d
    echo "✅ 개발환경이 시작되었습니다!"
    echo "📊 Adminer: http://localhost:8080"
    echo "🐘 PostgreSQL: localhost:5432"
    echo "🔴 Redis: localhost:6379"
    ;;
  
  "down")
    echo "🛑 개발환경 중지..."
    docker-compose -f docker-compose.dev.yml down
    echo "✅ 개발환경이 중지되었습니다!"
    ;;
  
  "restart")
    echo "🔄 개발환경 재시작..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml up -d
    echo "✅ 개발환경이 재시작되었습니다!"
    ;;
  
  "logs")
    docker-compose -f docker-compose.dev.yml logs -f ${2:-}
    ;;
  
  "status")
    echo "📊 컨테이너 상태:"
    docker-compose -f docker-compose.dev.yml ps
    ;;
  
  "clean")
    echo "🧹 개발환경 정리..."
    docker-compose -f docker-compose.dev.yml down -v
    docker system prune -f
    echo "✅ 개발환경이 정리되었습니다!"
    ;;
  
  "reset")
    echo "🔄 개발환경 완전 초기화..."
    docker-compose -f docker-compose.dev.yml down -v
    docker-compose -f docker-compose.dev.yml up -d
    echo "✅ 개발환경이 초기화되었습니다!"
    ;;
  
  "help"|*)
    echo "🛠️  개발환경 관리 스크립트"
    echo ""
    echo "사용법: $0 [명령어]"
    echo ""
    echo "명령어:"
    echo "  up       개발환경 시작"
    echo "  down     개발환경 중지"
    echo "  restart  개발환경 재시작"
    echo "  logs     로그 확인 (특정 서비스: $0 logs postgres)"
    echo "  status   컨테이너 상태 확인"
    echo "  clean    컨테이너 및 볼륨 정리"
    echo "  reset    완전 초기화 후 재시작"
    echo "  help     이 도움말 표시"
    ;;
esac
