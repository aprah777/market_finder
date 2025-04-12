document.addEventListener('DOMContentLoaded', function () {
  // 添加映射对象
  const typeMap = {
    'hotel': '酒店',
    'guesthouse': '民宿',
    'scenic': '景区',
    'complex': '旅游综合体'
  };

  const tierMap = {
    'budget': '经济型',
    'midrange': '中端',
    'highend': '高端',
    'luxury': '奢华'
  };

  const locationMap = {
    'city': '市中心',
    'coastal': '沿海地区',
    'mountain': '山地/自然',
    'historic': '历史文化区'
  };

  const featureMap = {
    'wellness': '养生健康',
    'family': '亲子家庭',
    'cultural': '文化体验',
    'nature': '自然探索',
    'romantic': '浪漫度假',
    'business': '商务会议'
  };

  const recommendationMap = {
    "酒店_高端_沿海地区_养生健康_浪漫度假": [
      {
        "name": "日本",
        "rating": "高",
        "tags": [
          "高消费力",
          "自然康养",
          "短途出行"
        ],
        "reason": "日本游客偏好沿海自然环境与高品质养生体验。"
      },
      {
        "name": "新加坡",
        "rating": "中",
        "tags": [
          "东南亚市场",
          "短途度假",
          "高转化率"
        ],
        "reason": "新加坡游客偏爱高端度假产品，关注浪漫与私密性。"
      }
    ],
    "酒店_高端_市中心_商务会议_文化体验": [
      {
        "name": "德国",
        "rating": "高",
        "tags": [
          "商务出行",
          "文化探索",
          "注重效率"
        ],
        "reason": "德国游客对城市化配套和文化背景并重，适合城市型高端酒店。"
      },
      {
        "name": "法国",
        "rating": "中",
        "tags": [
          "艺术氛围",
          "深度游",
          "文化欣赏"
        ],
        "reason": "法国旅客喜欢文化体验与都市慢旅行结合的住宿选择。"
      }
    ],
    "酒店_高端_历史文化区_文化体验_浪漫度假": [
      {
        "name": "意大利",
        "rating": "高",
        "tags": [
          "文化遗产",
          "人文氛围",
          "蜜月旅客"
        ],
        "reason": "意大利游客对中国历史文化景点兴趣浓厚，偏好主题型酒店。"
      }
    ],
    "民宿_中端_山地/自然_自然探索_亲子家庭": [
      {
        "name": "韩国",
        "rating": "中",
        "tags": [
          "亲子游",
          "自然体验",
          "短途出境"
        ],
        "reason": "韩国家庭游客重视自然安全与亲子共处，民宿型产品更易转化。"
      }
    ],
    "民宿_经济型_山地/自然_自然探索": [
      {
        "name": "越南",
        "rating": "中",
        "tags": [
          "生态旅行",
          "经济实惠",
          "自由行客群"
        ],
        "reason": "越南游客偏好价格亲民的生态旅游产品。"
      }
    ],
    "景区_中端_历史文化区_文化体验": [
      {
        "name": "马来西亚",
        "rating": "中",
        "tags": [
          "文化兴趣",
          "价格敏感",
          "学生群体"
        ],
        "reason": "马来西亚游客对中国历史与宗教文化景点较为关注。"
      }
    ],
    "酒店_高端_沿海地区_商务会议": [
      {
        "name": "阿联酋",
        "rating": "高",
        "tags": [
          "中东商务行",
          "国际交流",
          "会议型客人"
        ],
        "reason": "阿联酋商旅客倾向预订高端、具国际水准的沿海酒店。"
      }
    ],
    "酒店_中端_市中心_亲子家庭": [
      {
        "name": "澳大利亚",
        "rating": "中",
        "tags": [
          "家庭友好",
          "中长途旅行",
          "注重安全"
        ],
        "reason": "澳洲旅客多为家庭出行，青睐便利交通与亲子设施齐全的酒店。"
      }
    ],
    "酒店_高端_山地/自然_浪漫度假": [
      {
        "name": "英国",
        "rating": "中",
        "tags": [
          "隐秘山景",
          "浪漫旅行",
          "文化融合"
        ],
        "reason": "英国游客偏好自然结合人文的独特目的地，注重仪式感。"
      }
    ],
    "景区_高端_沿海地区_文化体验_自然探索": [
      {
        "name": "加拿大",
        "rating": "中",
        "tags": [
          "生态保护",
          "文化包容",
          "可持续旅游"
        ],
        "reason": "加拿大游客注重自然保护与文化价值结合的旅游体验。"
      }
    ]
  };
  
  const fallbackRecommendations = [
    {
      "name": "美国",
      "rating": "中",
      "tags": [
        "中国文化热度高",
        "出境自由行大国"
      ],
      "reason": "中国文化在美国受关注度高，适合打造文化主题吸引。"
    },
    {
      "name": "俄罗斯",
      "rating": "中",
      "tags": [
        "历史共鸣",
        "文化兴趣"
      ],
      "reason": "俄罗斯游客对中国传统文化和红色旅游有高度兴趣。"
    },
    {
      "name": "巴西",
      "rating": "中",
      "tags": [
        "文化互补",
        "新兴长线市场"
      ],
      "reason": "巴西游客对东方文化有强烈好奇，潜力正在上升。"
    }
  ];

  document.getElementById("analyze-btn").addEventListener("click", function () {
    // 获取表单值并转换为中文
    const typeValue = document.getElementById("businessType").value;
    const tierValue = document.getElementById("positioningTier").value;
    const locationValue = document.getElementById("locationType").value;
    const featuresValues = Array.from(document.querySelectorAll("input[name='keyFeatures']:checked")).map(el => el.value);
    
    // 检查必填项
    if (!typeValue || !tierValue || !locationValue || featuresValues.length === 0) {
      alert("请填写所有必填项并至少选择一个特色");
      return;
    }
    
    // 转换为中文值
    const type = typeMap[typeValue];
    const tier = tierMap[tierValue];
    const location = locationMap[locationValue];
    const features = featuresValues.map(value => featureMap[value]);

    // 生成recommendationMap的键
    const key = `${type}_${tier}_${location}_${features.join("_")}`;
    
    // 清空并准备结果区域
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    
    // 显示结果容器
    const resultsContainer = document.querySelector(".results-container");
    resultsContainer.style.display = "block";

    // 获取推荐结果
    const recommendations = recommendationMap[key];

    // 创建标题
    const title = document.createElement("h3");
    title.textContent = "推荐国家";
    title.style = "font-size: 1.2rem; margin-bottom: 1rem; color: #1F2937;";
    resultsDiv.appendChild(title);

    // 渲染结果卡片的函数
    const renderCard = (rec) => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <h3>${rec.name}</h3>
        <p><strong>市场潜力评级：</strong>${rec.rating}</p>
        <p><strong>关键词：</strong>${rec.tags.join("、")}</p>
        <p><strong>推荐理由：</strong>${rec.reason}</p>
      `;
      resultsDiv.appendChild(card);
    };

    // 显示推荐结果或备选推荐
    if (recommendations) {
      recommendations.forEach(renderCard);
    } else {
      const hint = document.createElement("p");
      hint.innerHTML = "暂无完全匹配的结果，为你推荐关注中国文化的热门客源国：";
      hint.style = "margin-bottom: 0.5rem;";
      resultsDiv.appendChild(hint);
      fallbackRecommendations.forEach(renderCard);
    }

    // 滚动到结果区域
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  });
});
