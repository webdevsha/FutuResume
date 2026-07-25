# Claude's FutuResume — AI Intelligence Architecture
## Building Your Own AI, Incrementally, While Building Your Product
*A learner-builder's guide: from web crawling to fine-tuned models*

---

> **How to read this document.**
> Each tier does two things simultaneously: it makes FutuResume smarter, and it teaches you a real ML skill. The tiers are sequential — each one builds on data and understanding from the one before. You are not just shipping a product. You are conducting a longitudinal research project on your own platform.

---

## 0. The North Star (What the AI Needs to Do)

One sentence:

> **Given a person's current portfolio evidence (CV + public artifacts) and a target role (job description + market signals), produce a ranked gap map, a future identity target, a 90-day artifact roadmap, and an immediate income strategy.**

Every model, every dataset, every crawl is in service of doing that one thing better.

---

## 1. The Five AI Functions

Each function is independently buildable. Start with Function 1. Add the others in order.

| # | Function | What It Does | First Available |
|---|---|---|---|
| **1** | **Gap Analysis Engine** | CV evidence → role proof requirements → ranked missing artifacts | Tier 0 (today) |
| **2** | **Role Signal Extractor** | Parses any job description / URL → structured hiring signals | Tier 1 |
| **3** | **Idealized Profile Generator** | Builds future-state portfolio identity for a domain (5-year target, not one role) | Tier 2 |
| **4** | **Artifact Roadmap Builder** | Missing artifacts → 90-day deliverable plan tied to real cert paths | Tier 2 |
| **5** | **Market Signal Radar** | Continuously monitors role demand shifts and proof requirement changes — proactively alerts users | Tier 3+ |

---

## 2. Data Signals — What to Feed Each Engine

Think of this in two layers: **what the user gives you** (per session) and **what you collect from the world** (continuously).

### 2.1 User-Side Inputs

| Signal | Format | What It Gives You |
|---|---|---|
| CV / resume | PDF, DOCX, plain text | Current portfolio identity: job history, publications, repos, courses, community involvement |
| Job description | Text or URL | Target role proof requirements, domain vocabulary, seniority signals |
| LinkedIn URL | Scraped (with consent) | Community signals, endorsements, activity cadence, connections |
| GitHub | API (public) | Repos, commit history, stars, languages — objective evidence of building |
| ORCID / Google Scholar | API | Published papers, citations, h-index — academic proof artifacts |
| HuggingFace / Kaggle | API | Model cards, datasets, competition ranks — ML-specific proof |
| Medium / Substack / personal site | Scraped | Writing artifacts: post count, readership signals, citation by others |
| Self-reported 12-month goal | Free text | Weights the roadmap toward an identity target, not just the next job title |

### 2.2 Market-Side Signals (What You Crawl from the World)

This is where your web crawler work directly feeds your AI. Each source below is something you will eventually scrape, store, and use as training data or retrieval context.

#### Labour Market — Job Postings

| Source | What Signal You Extract | Crawl Cadence |
|---|---|---|
| LinkedIn Jobs | Role volume, required artifact types per role, seniority creep, emerging titles | Weekly |
| Indeed / Glassdoor / JobStreet | Volume by domain, salary bands, role velocity | Weekly |
| Jobbank Malaysia / MYFutureJobs | ASEAN/MY-specific role demand, government roles | Weekly |
| OpenAI / Anthropic / DeepMind career pages | Frontier proof requirements — these orgs lead the field's hiring signals | Weekly |
| Epoch AI / ARC Evals / Redwood Research | Evaluation-specific proof signals | Weekly |
| CERN / academic labs (for research roles) | Academic artifact requirements vs. industry | Monthly |

**What a crawled job posting gives you (as training data):**
```
Input:  raw job description HTML
Output: {
  "role_family": "AI Safety Researcher",
  "required_artifacts": [
    "published_evaluation_report",
    "benchmark_contribution",
    "public_alignment_writeup"
  ],
  "nice_to_have": ["conference_talk", "open_source_tool"],
  "seniority": "mid",
  "domain": "AI safety"
}
```
Over 10,000 postings, this becomes your role signal database — the ground truth your models learn from.

#### Proof Signal Sources — What Evidence the Market Rewards

| Source | What Signal You Extract | Crawl Cadence |
|---|---|---|
| arXiv (cs.AI, cs.LG, cs.CY) | Citation patterns, emerging research domains, artifact types cited in papers | Daily |
| Semantic Scholar API | Paper citations by domain, author proof portfolios | Weekly |
| GitHub trending | Artifact types (tools, benchmarks, datasets) gaining traction by domain | Weekly |
| HuggingFace Hub | Model card patterns, dataset upload trends, evaluation framework adoption | Weekly |
| Kaggle competitions | Data science proof artifact trends, winning solution types | Monthly |
| Conference programmes (NeurIPS, ICLR, FAccT, AAAI) | Accepted paper topics → what research proof is valued | Per cycle |
| Substack / Medium (by tag) | Writing artifact domains with growing readership | Weekly |

#### Economic & Macro Signals

| Source | What Signal You Extract | Cadence |
|---|---|---|
| IMF / World Bank labour reports | AI exposure indices, GDP-linked role demand shifts | Quarterly |
| PwC AI Jobs Barometer | Professional vs. democratised role growth ratios (your landing page data) | Annual |
| OpenAI AI Jobs Transition Framework | Role reorganisation forecasts | Per release |
| McKinsey / BCG future of work reports | Sector-level proof requirement shifts | Per release |
| Crunchbase (VC flows) | New companies → new role categories → new proof requirements | Monthly |
| DOSM Malaysia / BLS (US) | Regional employment forecasts | Monthly |
| Policy signals (AI Act, NIST AI RMF, MyDigital, ASEAN AI Framework) | Regulatory-driven new roles (AI auditors, safety evaluators, policy analysts) | Per release |

#### Discourse Signals — What Practitioners Say

| Source | What Signal You Extract | Cadence |
|---|---|---|
| Twitter/X (#AISafety, #MLOps, #PolicyAI) | Emerging vocabulary, community proof norms shifting | Daily |
| Reddit r/MachineLearning, r/cscareerquestions, r/artificial | Practitioner-reported hiring signal changes | Weekly |
| Hacker News "Who is Hiring?" threads | What technical companies actually ask for right now | Monthly |
| LessWrong / AI Alignment Forum | Proof artifact norms in the AI safety community | Weekly |
| 80,000 Hours podcast transcripts | Domain authority proof discussions | Per episode |

---

## 3. Tiered Build Roadmap — Product + Learning Together

Each tier is structured as: **what the product does → what AI you build → what data you need → how to build it → what you learn as a student**.

---

### ◆ Tier 0 — Prompt Engineering (Now, Week 1–2)

**Product:** Landing page demo. User pastes role + background, gets a gap map in 30 seconds.

**AI approach:** Zero-shot prompting to an existing LLM (Claude Haiku via OpenRouter). No fine-tuning, no training data, no crawler. The model's general knowledge does the work.

**What the AI is doing literally:**
```
User input: "I want to be an AI Safety Researcher. I'm a software engineer, 3 years, no published work."
         ↓
Prompt template fills in structured instructions
         ↓
Claude Haiku generates: { score: 42, missing: [...], insight: "..." }
         ↓
Frontend renders result
```

**Accuracy ceiling:** ~60–70% on common roles. The model guesses proof requirements from training data — it has never seen your actual job postings.

**Cost:** ~$0.001 per analysis.

**What you learn at this stage:**
- How LLM APIs work (HTTP POST, JSON payloads, streaming)
- Prompt engineering: system prompts, few-shot examples, output formatting constraints
- How to get structured JSON output reliably from a language model
- How to handle API errors, rate limits, fallbacks

**Milestone:** 100 people use the demo. You start collecting what roles they search for. This is your first dataset.

---

### ◆ Tier 1 — Real Parsing + Your First Crawler (Month 1–3)

**Product:** Paid users upload a real CV and paste a real job description. The system parses both into structured JSON before sending to the LLM. Gap maps become more specific.

**What changes:** You are no longer relying on the user to summarise themselves. You extract the structure directly.

#### 1a. CV Parser

**Tool:** `pdfplumber` (PDF text extraction) + `python-docx` (Word files) + regex cleaning.

```python
import pdfplumber

def extract_cv_text(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        return "\n".join(page.extract_text() for page in pdf.pages)

# Then pass raw text to LLM with extraction prompt:
# "Extract: work history, artifacts (papers, repos, reports), 
#  education, certifications, community involvement. Output JSON."
```

**What you learn:** File I/O, text preprocessing, how unstructured text becomes structured data. This is the foundation of all NLP pipelines.

#### 1b. Job Description Parser — Your First Real Crawler

This is where crawling begins. You want to be able to give FutuResume *any* job URL and have it extract proof requirements.

**Step 1: Simple HTTP fetch + BeautifulSoup**
```python
import requests
from bs4 import BeautifulSoup

def fetch_job_description(url):
    headers = {"User-Agent": "Mozilla/5.0"}  # polite crawler header
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Most job sites put the description in a specific div
    # You will need to inspect each site's HTML structure
    description = soup.find("div", class_="job-description")
    return description.get_text(separator="\n") if description else response.text
```

**Step 2: What you discover immediately**
- LinkedIn blocks scrapers (returns 999 or login wall)
- Indeed uses JavaScript rendering (BeautifulSoup can't see it)
- Some sites work fine (personal company career pages, smaller boards)

**Step 3: Solutions you learn**
- `playwright` or `selenium` for JavaScript-rendered pages (headless browser)
- LinkedIn has an official Jobs API (apply for access)
- Indeed has a publisher API
- For blocked sites: respect rate limits, use rotating user agents, add `time.sleep()`

**Step 4: Building your first dataset**
Once your crawler works on one site, you run it in batch:
```python
urls = ["https://jobs.lever.co/anthropic/...", "https://boards.greenhouse.io/..."]
for url in urls:
    text = fetch_job_description(url)
    save_to_db(url, text, crawled_at=datetime.now())
    time.sleep(2)  # be polite — don't hammer servers
```

**Your first real dataset:** 500 job postings, stored as raw text in Supabase. This is the seed of everything.

**What you learn:**
- HTTP requests, response codes, headers
- HTML structure, CSS selectors, DOM traversal
- Why JavaScript rendering is different from server-side HTML
- Rate limiting and ethical crawling (`robots.txt`, `crawl-delay`)
- How to store unstructured data (text blobs in a database)

**Milestone:** 500 raw job postings stored. LLM now has real context to retrieve from (see Tier 2). Gap maps become noticeably more specific.

---

### ◆ Tier 2 — RAG: Grounding the LLM in Your Crawled Data (Month 3–6)

**What RAG means:** Retrieval-Augmented Generation. Instead of asking the LLM to guess what an AI safety researcher needs, you retrieve real proof requirements from your crawled job postings and feed them into the prompt as context.

```
Before RAG (Tier 0):  User input → LLM guesses → Output
After RAG  (Tier 2):  User input → Retrieve relevant job postings → LLM + real context → Output
```

The LLM stops guessing. It reads real postings.

#### 2a. Labelling Your Crawled Data (Your First ML Dataset)

Before you can retrieve meaningfully, you need structured labels. Take your 500 raw job postings and run this extraction pipeline:

```python
def label_job_posting(raw_text):
    prompt = f"""
    Extract from this job description:
    1. role_family (one of: AI_safety_researcher, ML_engineer, policy_analyst, 
       evaluation_researcher, data_scientist, AI_product_manager)
    2. required_artifacts (list of: published_paper, benchmark_contribution, 
       github_repo, evaluation_rubric, case_study, conference_talk, 
       technical_blog, dataset, open_source_tool)
    3. nice_to_have_artifacts (same list)
    4. seniority (junior/mid/senior/lead)
    
    Job description:
    {raw_text}
    
    Output JSON only.
    """
    return call_llm(prompt)  # Claude Sonnet for better extraction quality
```

You now have 500 labelled examples:
```json
{
  "raw_text": "...job description...",
  "role_family": "AI_safety_researcher",
  "required_artifacts": ["published_evaluation_report", "benchmark_contribution"],
  "seniority": "mid"
}
```

**This is your first training dataset. Guard it.**

#### 2b. Embedding + Vector Search

You need to find similar job postings to a user's query. You do this by converting text to numbers (embeddings) and searching by similarity.

```python
# pip install openai qdrant-client

from openai import OpenAI
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct

client = OpenAI()
qdrant = QdrantClient(":memory:")  # local for dev, Qdrant cloud for prod

def embed(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"  # cheap: $0.02 per million tokens
    )
    return response.data[0].embedding  # 1536-dimensional vector

# Index all job postings
points = []
for i, posting in enumerate(labelled_postings):
    vector = embed(posting["raw_text"])
    points.append(PointStruct(
        id=i,
        vector=vector,
        payload=posting  # store the label data alongside the vector
    ))

qdrant.upsert(collection_name="job_postings", points=points)

# Retrieve similar postings at query time
def retrieve_similar_roles(user_role_description, top_k=5):
    query_vector = embed(user_role_description)
    results = qdrant.search(
        collection_name="job_postings",
        query_vector=query_vector,
        limit=top_k
    )
    return [r.payload for r in results]
```

**Full RAG pipeline:**
```python
def analyse_gap(cv_text, job_description):
    # Step 1: retrieve real job signal context
    similar_roles = retrieve_similar_roles(job_description, top_k=5)
    role_signals = extract_proof_signals(similar_roles)  # aggregate required artifacts
    
    # Step 2: LLM gets real context, not just its training data
    prompt = f"""
    CV: {cv_text}
    
    Target role description: {job_description}
    
    Real proof requirements from 5 similar roles currently hiring:
    {role_signals}
    
    Produce: gap map, missing artifacts, idealized profile. JSON only.
    """
    return call_llm(prompt)
```

**What you learn:**
- What an embedding is (a vector representation of text meaning)
- How cosine similarity works (finding "close" vectors)
- Vector databases: why they exist, how they differ from SQL
- The difference between semantic search and keyword search
- RAG as an architectural pattern (the most important LLM architecture to understand right now)

**Accuracy jump:** From ~65% (Tier 0) to ~80–85% (Tier 2). The model is reading real hiring evidence, not guessing.

**Milestone:** 5,000 job postings indexed. Gap maps now reference real role requirements. Users notice.

---

### ◆ Tier 3 — Your First Bespoke Model: Fine-Tuning a Classifier (Month 6–12)

**Why fine-tune now?** The LLM is doing extraction (job description → proof artifacts) on every request. It's slow (~2s per call) and expensive. A small fine-tuned classifier can do the same extraction in ~50ms for ~1/100th the cost — and it's *your* model, trained on *your* data.

#### 3a. What You're Building

**Model: Artifact Classifier**
- Input: a sentence or paragraph from a job description
- Output: which proof artifact type it refers to (if any)
- Architecture: fine-tuned `bert-base-uncased` or `deberta-v3-small`

This is a **text classification** task — one of the most fundamental ML problems, and the best one to learn fine-tuning on.

#### 3b. Building Your Training Dataset from Your Crawled Data

You already have 5,000 labelled job postings from Tier 2. Now you extract sentence-level examples:

```python
import json

training_examples = []

for posting in labelled_postings:
    sentences = posting["raw_text"].split("\n")
    for sentence in sentences:
        sentence = sentence.strip()
        if len(sentence) < 10:
            continue
        
        # Check if this sentence mentions a known artifact type
        label = classify_sentence_by_keywords(sentence)
        # e.g. "published benchmark" → "benchmark_contribution"
        # e.g. "GitHub repository" → "github_repo"
        # e.g. "no artifact mentioned" → "none"
        
        training_examples.append({
            "text": sentence,
            "label": label
        })

# Save as JSONL (one JSON object per line — standard ML training format)
with open("artifact_classifier_train.jsonl", "w") as f:
    for example in training_examples:
        f.write(json.dumps(example) + "\n")
```

You now have ~50,000 sentence-level labelled examples from your crawled data. **Your crawler built your training set.**

#### 3c. Fine-Tuning with Hugging Face

```python
# pip install transformers datasets evaluate scikit-learn

from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer
)
import numpy as np
import evaluate

# 1. Load your dataset
dataset = load_dataset("json", data_files={
    "train": "artifact_classifier_train.jsonl",
    "test": "artifact_classifier_test.jsonl"
})

# 2. Define label mapping
LABELS = [
    "none",
    "published_paper",
    "benchmark_contribution", 
    "github_repo",
    "evaluation_rubric",
    "case_study",
    "conference_talk",
    "technical_blog",
    "dataset",
    "open_source_tool"
]
label2id = {l: i for i, l in enumerate(LABELS)}
id2label = {i: l for i, l in enumerate(LABELS)}

# 3. Load tokenizer and model
model_name = "microsoft/deberta-v3-small"  # small, fast, accurate
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=len(LABELS),
    id2label=id2label,
    label2id=label2id
)

# 4. Tokenize
def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, padding="max_length", max_length=128)

dataset = dataset.map(tokenize, batched=True)
dataset = dataset.map(lambda x: {"labels": label2id[x["label"]]})

# 5. Training arguments
training_args = TrainingArguments(
    output_dir="./artifact_classifier",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1",
    learning_rate=2e-5,
    weight_decay=0.01,
    warmup_ratio=0.1
)

# 6. Metrics
accuracy_metric = evaluate.load("accuracy")
f1_metric = evaluate.load("f1")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    acc = accuracy_metric.compute(predictions=predictions, references=labels)
    f1 = f1_metric.compute(predictions=predictions, references=labels, average="weighted")
    return {**acc, **f1}

# 7. Train
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    compute_metrics=compute_metrics
)

trainer.train()
trainer.save_model("./artifact_classifier_final")
```

**Run this on:** Google Colab (free GPU, takes ~30–60 minutes for 50k examples). Or RunPod for ~$1–3 total compute cost.

**Expected results:** ~88–92% accuracy on held-out test set. Your own model, extracting proof artifacts from job descriptions.

**Deploying your model:**
```python
# Option 1: Hugging Face Inference Endpoints (cheapest, easiest)
# Upload model to HuggingFace Hub → enable inference endpoint → $0.06/hr for CPU

# Option 2: FastAPI locally or on Render
from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="./artifact_classifier_final",
    tokenizer=tokenizer
)

@app.post("/classify-artifact")
def classify(text: str):
    result = classifier(text)[0]
    return {"artifact_type": result["label"], "confidence": result["score"]}
```

**What you learn:**
- Transfer learning: why fine-tuning beats training from scratch
- Tokenisation: how text becomes numbers a model can read
- Training loops, loss functions, gradient descent (conceptually via Trainer abstraction)
- Evaluation metrics: accuracy vs. F1 and why F1 matters for imbalanced classes
- Saving and loading models, HuggingFace Hub
- How your own crawled data becomes your model's training signal

**Milestone:** Your first production ML model, trained on your own data, serving real users. Replace one LLM extraction call with your classifier → 50ms latency, 100× cheaper per call.

---

### ◆ Tier 3b — Fine-Tuning a Seq2Seq Model for Full JD Extraction (Month 9–15)

**Why:** Your classifier labels sentences. But you want the full job description → structured JSON in one shot, without sentence-by-sentence iteration. A seq2seq model (encoder-decoder) can do this.

**Model:** Fine-tune `google/flan-t5-base` (280M parameters, fits on free Colab GPU).

**Training data format (from your labelled postings):**
```
Input:  "We're looking for candidates with experience publishing 
         evaluation benchmarks. A GitHub portfolio of safety-related 
         work is strongly preferred."

Output: {
  "required_artifacts": ["benchmark_contribution"],
  "nice_to_have": ["github_repo"],
  "role_family": "AI_safety_researcher"
}
```

**Dataset size needed:** ~2,000–5,000 high-quality (JD, JSON) pairs.

**How to create them:** Use Claude Sonnet to label your crawled postings, then human-review a sample (10%) to verify quality. This is called **LLM-assisted labelling** or **silver labelling** — industry standard practice.

```python
def silver_label(raw_jd_text):
    """Use a capable LLM to generate training labels for a weaker model."""
    response = call_llm(
        model="claude-sonnet-4-6",
        prompt=f"Extract structured proof requirements from this job description. Output JSON only.\n\n{raw_jd_text}"
    )
    return response  # This becomes a training example for Flan-T5
```

**What you learn:**
- Encoder-decoder architectures (how T5 differs from BERT and GPT)
- Seq2seq training: teacher forcing, generation strategies (greedy vs. beam search)
- LLM-assisted dataset creation (the actual workflow used in industry)
- Trade-off between model size, accuracy, and inference cost

---

### ◆ Tier 3c — Market Trend Forecaster (Month 12–18)

**What it does:** Given 18 months of role posting counts per domain (scraped weekly), predict which proof artifacts will be required *more frequently* in 6 months.

**This is not deep learning.** This is classical time-series forecasting. Much easier to learn, very effective on tabular data.

**Your data (from weekly crawling):**
```csv
week,        role_family,           artifact_type,            posting_count
2024-W01,    AI_safety_researcher,  published_evaluation_report,  142
2024-W02,    AI_safety_researcher,  published_evaluation_report,  156
...
2025-W30,    AI_safety_researcher,  published_evaluation_report,  389
```

**Model: Facebook Prophet (time-series forecasting)**
```python
from prophet import Prophet
import pandas as pd

# Load your weekly aggregated data
df = pd.read_csv("artifact_demand_weekly.csv")
df = df[df["artifact_type"] == "published_evaluation_report"][["week", "posting_count"]]
df.columns = ["ds", "y"]  # Prophet requires these column names

# Train
model = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=False,  # no weekly hiring seasonality for our use case
    changepoint_prior_scale=0.05  # how flexible the trend line is
)
model.fit(df)

# Forecast 26 weeks ahead
future = model.make_future_dataframe(periods=26, freq="W")
forecast = model.predict(future)

print(forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(26))
```

**What this produces for FutuResume:** "Demand for published evaluation reports in AI safety roles is projected to increase 34% over the next 6 months. Consider prioritising this artifact in your roadmap."

**What you learn:**
- Time-series data: what it is, why it's different from tabular classification
- Trend, seasonality, residuals — the three components of any time series
- Prophet's additive model (you can actually understand what it's doing)
- How to turn a model's output into a product feature (a proactive alert)

---

### ◆ Tier 4 — Recommendation System (Year 2)

**What it does:** Given a user's current portfolio, recommend which artifact to build next for maximum hiring impact — personalised to them, not just "do what everyone does."

**Why it's different:** This requires data from *many users over time*. You can't build it until you have ~1,000+ users with tracked portfolio build histories. Plan for it now; build it when the data exists.

**Architecture: Collaborative Filtering**

The intuition: "Users who had a similar portfolio to yours at 42% alignment and built artifact X before artifact Y ended up with 71% alignment. You should build X next."

```python
# pip install lightfm

from lightfm import LightFM
from lightfm.data import Dataset
import numpy as np

# Interaction matrix: user × artifact (did user build this artifact?)
# interactions[user_id][artifact_type] = 1 if built, 0 if not

dataset = Dataset()
dataset.fit(users=user_ids, items=artifact_types)

# Build sparse interaction matrix from user portfolio histories
(interactions, weights) = dataset.build_interactions([
    (user_id, artifact_type)
    for user_id, artifacts in user_portfolio_histories.items()
    for artifact_type in artifacts
])

# Train
model = LightFM(loss="warp")  # WARP = Weighted Approximate-Rank Pairwise
model.fit(interactions, epochs=30, num_threads=4)

# Recommend
def recommend_next_artifact(user_id, n=3):
    user_idx = dataset.mapping()[0][user_id]
    artifact_indices = np.arange(len(artifact_types))
    scores = model.predict(user_idx, artifact_indices)
    top_artifacts = [artifact_types[i] for i in np.argsort(-scores)[:n]]
    return top_artifacts
```

**What you learn:**
- Collaborative filtering and matrix factorisation (how Netflix, Spotify recommendations work)
- Sparse matrices (why most users haven't built most artifacts → a very sparse matrix)
- WARP loss (a ranking loss function — learning to rank, not just classify)
- Cold start problem (what to do for new users with no history)

---

### ◆ Tier 5 — Proprietary Fine-Tuned LLM (Year 3+)

**What makes this different from Tier 3:** In Tier 3, you fine-tuned a classifier on *job posting data* (text → label). In Tier 5, you fine-tune a full language model on *hiring outcome data* (CV + JD + what actually happened).

**Training data structure:**
```json
{
  "cv_portfolio": "Software engineer, 3 years. No published work. MSc CS.",
  "job_description": "AI Safety Researcher at Redwood Research...",
  "outcome": "rejected",
  "missing_artifacts_confirmed": ["published_evaluation_report", "benchmark_contribution"]
}
```

After 10,000+ of these outcome triples (collected from users who opt in), you can fine-tune a Mistral-7B or Llama-3-8B to predict:
1. Whether a candidate will be shortlisted
2. Which specific artifacts would have changed the outcome
3. How the required proof profile for this role has shifted over time

**This model is a moat.** No generic LLM has been trained on real hiring outcomes in the career proof domain. Yours has.

**How to fine-tune a 7B model (LoRA/QLoRA — the practical approach):**
```python
# QLoRA = Quantised Low-Rank Adaptation
# Trains only a small number of additional parameters (adapters)
# instead of all 7 billion weights → fits on a single A100 GPU

from peft import LoraConfig, get_peft_model, TaskType
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

# Load quantised base model (4-bit quantisation → fits in ~10GB VRAM)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

base_model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    quantization_config=bnb_config,
    device_map="auto"
)

# Add LoRA adapters (only these parameters get trained)
lora_config = LoraConfig(
    r=16,             # rank of the adapter matrices
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],  # which layers to adapt
    lora_dropout=0.1,
    task_type=TaskType.CAUSAL_LM
)

model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()
# Output: "trainable params: 8,388,608 || all params: 3,760,619,520 || 0.22%"
# You're only training 0.22% of the model's weights.
```

**Compute cost:** One A100 GPU on RunPod or Lambda Labs, ~$2–3/hr. Fine-tuning 10k examples ≈ 4–8 hours ≈ $8–24 total. Retrain quarterly.

**What you learn:**
- Parameter-efficient fine-tuning (why you can't fine-tune 7B parameters on one GPU without LoRA)
- Quantisation (how 4-bit weights reduce memory without catastrophic accuracy loss)
- Instruction fine-tuning format (how to structure your training examples for a causal LM)
- Adapter merging (how to combine the trained adapters back with the base model for deployment)

---

## 4. The Crawl → Dataset → Fine-Tune Loop (The Core Learning Cycle)

This is the loop you repeat at every tier. Understand this pattern and you understand the whole architecture.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CRAWL              STORE              LABEL               │
│                                                             │
│   Scrapy /    →   Supabase /    →   LLM-assisted  →        │
│   requests        PostgreSQL         silver labels          │
│                                                             │
│                         ↓                                   │
│                                                             │
│   TRAIN              EVALUATE          DEPLOY               │
│                                                             │
│   Hugging    →    F1 / accuracy   →   FastAPI /   →        │
│   Face            on held-out set     HF Endpoint           │
│   Trainer                                                   │
│                                                             │
│                         ↓                                   │
│                                                             │
│   PRODUCT USES MODEL → COLLECTS MORE DATA → LOOP REPEATS   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Each pass through the loop:
- Makes FutuResume's gap maps more accurate
- Gives you a new ML skill
- Produces a concrete thing you've built (a model, a dataset, a pipeline)
- Adds to your own public portfolio as an AI/ML practitioner

---

## 5. Your Learning Sequence (As a Student)

Each tier introduces one concept. Learn it by building it for FutuResume.

| Tier | Concept You Learn | Artefact You Build | Prereqs |
|---|---|---|---|
| 0 | LLM APIs, prompt engineering | Haiku-powered gap demo | Python basics, HTTP |
| 1 | Web crawling, HTML parsing, databases | Job posting scraper + Supabase storage | Tier 0 + SQL basics |
| 2a | Text embeddings, vector search, RAG | Qdrant-backed job signal retriever | Tier 1 + linear algebra (vectors) |
| 2b | Dataset labelling, annotation methodology | 5,000 labelled job postings JSONL | Tier 1 |
| 3a | Transfer learning, fine-tuning, classification | Artifact classifier (DeBERTa) | Tier 2b + PyTorch basics |
| 3b | Seq2seq, encoder-decoder, LLM-assisted labelling | JD → JSON extractor (Flan-T5) | Tier 3a |
| 3c | Time series, forecasting, seasonality | Artifact demand forecaster (Prophet) | Tier 1 + Pandas |
| 4 | Recommender systems, collaborative filtering | Next-artifact recommender (LightFM) | Tier 3a + linear algebra |
| 5 | LoRA, QLoRA, instruction fine-tuning, LLM alignment | Career proof intelligence model (Mistral-7B) | Tier 3–4 + GPU basics |

**One rule:** Never move to the next tier until you have enough data to justify it. The bottleneck is always data, not model sophistication.

---

## 6. Crawling Ethics and Robots.txt

You must do this correctly. Crawling unethically can get your IP blocked, violate ToS, or expose you to legal risk.

```python
import urllib.robotparser

def is_crawl_allowed(base_url, path, user_agent="FutuResumeCrawler"):
    """Check robots.txt before crawling any page."""
    rp = urllib.robotparser.RobotFileParser()
    rp.set_url(f"{base_url}/robots.txt")
    rp.read()
    return rp.can_fetch(user_agent, f"{base_url}{path}")

# Always check before scraping
if is_crawl_allowed("https://example-jobs.com", "/jobs/ai-safety"):
    data = fetch_job_description("https://example-jobs.com/jobs/ai-safety")
else:
    print("Crawling not permitted by robots.txt")
```

**Rules:**
1. Always read `robots.txt` and respect `Crawl-delay` directives
2. Identify your crawler in `User-Agent` header
3. Never scrape authenticated content (logged-in pages)
4. Store only what you need; don't republish raw scraped content
5. If a site offers an API, use the API — it's more reliable and explicitly permitted

---

## 7. What NOT to Build (and Why)

| Temptation | Why to Skip | What to Do Instead |
|---|---|---|
| LLM from scratch | $1M+, 6–12 months, no competitive advantage | Fine-tune Mistral/Llama with LoRA |
| Your own embedding model | Worse than OpenAI/Cohere at this stage | Use `text-embedding-3-small` until Tier 4 |
| Real-time scraping at launch | High infra complexity, low signal value | Weekly batch jobs first |
| RLHF / Constitutional AI | Requires dedicated labeller pipeline + scale | Tier 5 problem; instruction fine-tune first |
| Computer vision for CV parsing | Edge case; 95% of CVs are text-based | Solve text first; multi-modal is a v2 problem |
| Building your own vector DB | Qdrant is free, open-source, excellent | Focus on the data, not the infra |

---

## 8. Data Flywheel (The Long Game)

```
User uploads CV + job description
            ↓
Platform generates gap map + roadmap
            ↓
User builds artifacts (GitHub push, arXiv preprint, blog post)
            ↓
Platform detects new artifact (API polling + notifications)
            ↓
Portfolio proof score updates automatically
            ↓
User applies to role
            ↓
User self-reports outcome (hired / shortlisted / rejected) → earns 20 free credits
            ↓
Outcome triple added: (CV portfolio, JD, outcome) → training dataset
            ↓
Models retrain quarterly on real hiring outcomes
            ↓
Gap maps become more accurate → users trust the platform more
            ↓
More uploads → more outcome data → better models → repeat
```

After 10,000 outcome triples, FutuResume's gap analysis is better than any general-purpose LLM can produce from prompting alone. That's the moat — not the model. The data.

---

## 9. Tech Stack by Tier

| Component | Tier 1 | Tier 2 | Tier 3 | Tier 4–5 |
|---|---|---|---|---|
| **LLM inference** | OpenRouter (Haiku) | OpenRouter (Sonnet) + Ollama batch | HF Inference Endpoints (your classifier) | Fine-tuned Mistral via Modal |
| **Crawling** | requests + BS4 | Scrapy (async, polite) | Scrapy + Playwright (JS pages) | Same + Kafka for stream |
| **CV parsing** | pdfplumber + python-docx | + Unstructured.io | Same | Same |
| **Vector DB** | — | Qdrant local | Qdrant cloud | Qdrant cloud |
| **Database** | Supabase (Postgres) | Same | Same | Same + read replicas |
| **ML training** | — | — | Google Colab Pro | RunPod A100 |
| **ML serving** | — | — | HF Inference Endpoint | Modal serverless |
| **Backend** | FastAPI | FastAPI + Celery workers | Same | Same |
| **Observability** | — | Langfuse (LLM traces) | + model metrics | + Prometheus/Grafana |

---

## 10. One Sentence Per Tier

- **Tier 0:** A smart form that wraps Claude. Ships in a week.
- **Tier 1:** A real parser that reads CVs and crawls job postings. Your first dataset.
- **Tier 2:** A grounded analyser — RAG means the LLM reads real evidence, not its training intuition.
- **Tier 3a:** Your first bespoke model — a classifier trained on your own crawled data.
- **Tier 3b:** Your first seq2seq model — end-to-end extraction from raw JD text.
- **Tier 3c:** Your first forecaster — market intelligence built from your own time-series data.
- **Tier 4:** Your first recommender — personalised to individual users, not role averages.
- **Tier 5:** Your proprietary LLM — trained on real hiring outcomes. Defensible. Yours.

**Inkling's FUTURESUME — AI ARCHITECTURE MD**
*From scraped signals → bespoke model → incremental intelligence*

---

## 1. WHAT AI YOU CAN BUILD (The System)

Not one model. **Four specialized agents** that share a crawled knowledge base.

| Agent | Function | Input → Output |
|---|---|---|
| **Signal Crawler** | Collects live market data | Job boards, news, social feeds, forecast reports → Structured market signal dataset |
| **Gap Classifier** | Identifies proof/portfolio gaps | CV text + job description → Specific missing artifacts (not generic skills) |
| **Identity Builder** | Generates Idealized Profile™ | Target role family + user skills + market signals → Future-state portfolio identity |
| **Offer Matcher** | Creates Immediate Offer Strategy | User current skills + market demand signals + price benchmarks → Specific service offers with templates |

**The bespoke layer:** A fine-tuned small LLM (3B–7B parameters) trained on your crawled dataset of job evaluations, portfolio artifacts, transition pathways, and market gap patterns — not generic ChatGPT output.

---

## 2. DATA FEEDS (What Goes In)

You crawl and structure five signal streams. This is your proprietary dataset — the one no generic career tool has.

| Signal Stream | Source | Data Points | Update Frequency |
|---|---|---|---|
| **Job Vacancy Signals** | Lever, Workday, LinkedIn, company career pages (Epoch AI-style roles) | Role titles, requirements, evaluation criteria, team structure, salary ranges, number of open positions per domain | Daily crawl |
| **Market Reports** | PwC, OpenAI Transition Framework, BLS projections, LinkedIn Economic Graph | Skill gap growth rates, role reorganisation stats, professionalised vs democratised job trends | Weekly ingestion |
| **Social / Community Signals** | LessWrong, Alignment Forum, Twitter/X (researchers), GitHub (repo activity on evaluation/benchmark tools) | Emerging vocabulary, new benchmark methods, community-identified skill gaps, sentiment on "what gets you hired" | Continuous stream |
| **News / Policy** | AI policy news, evaluation lab announcements (Anthropic, DeepMind, OpenAI releases), funding rounds in AI safety | New evaluation frameworks, regulatory requirements creating new roles, institutional hiring patterns | Daily digest |
| **Portfolio / Artifact Evidence** | GitHub repos (benchmark tools, evaluation reports), arXiv papers (evaluation methods), public portfolios of people in target roles | What actual artifacts exist for each role family; which ones get cited/referenced; structure of successful reports | Weekly crawl |

**Crawling approach (your learning path):**
- **Phase 1 (MVP):** Python `requests` + `BeautifulSoup4` for job pages; `Newspaper3k` for news; `tweepy` or `snscrape` for public social posts. Store raw HTML/text in JSONL.
- **Phase 2:** `Scrapy` framework with rotating proxies (`ScraperAPI` or `Bright Data`) for scale. Add `Playwright` for JavaScript-heavy job boards.
- **Phase 3:** Structured extraction pipelines (`spaCy` NER for skills, `regex` templates for rubrics) that auto-label crawled data.

---

## 3. AI ARCHITECTURE (How It Works Together)

```
┌─────────────────────────────────────────────────────────────┐
│  DATA INGESTION LAYER (Your Crawl Pipeline)                 │
│  Job URLs · News RSS · Social APIs · Reports PDF            │
│  → Clean JSONL dataset (proprietary to Futuresume)          │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  SIGNAL PROCESSING (Classical ML + Rules)                    │
│  NER (spaCy) → Skill entities                              │
│  TF-IDF + keyword rules → Job family clustering             │
│  Time-series → Open position counts per domain              │
│  Sentiment (VADER/TextBlob) → Community urgency signals     │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  KNOWLEDGE BASE (Vector DB + Structured DB)                │
│  Chunked crawled articles/reports · Job requirement vectors │
│  Portfolio artifact examples · Certification pathways      │
│  → ChromaDB / Pinecone / Weaviate                         │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  BESPOKE MODEL LAYER (Your Fine-Tuned LLM)                 │
│  Base: Mistral-7B / Llama-3.2-3B (open weights)            │
│  Fine-tuned on: Your crawl dataset (gap patterns, artifact │
│  structures, transition narratives, market signals)         │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  AGENT ORCHESTRATION (RAG + Fine-Tuned Generation)         │
│  Signal Crawler → Gap Classifier → Identity Builder        │
│  → Offer Matcher → Cohort Dashboard                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. DEVELOPMENT TIERS (MVP → Ideal)

This is designed so you build **one piece of real AI at a time** as you learn.

### Tier 1 — MVP (Months 1–2): RAG-Based Intelligence
**What it is:** You don't fine-tune yet. You build the **crawling pipeline** and use **Retrieval-Augmented Generation (RAG)** with a strong open-source LLM.

**Tech:**
- Crawl: `Python` + `BeautifulSoup` + `requests`
- Store: `JSONL` files + `SQLite` (lightweight)
- RAG: `LangChain` or `LlamaIndex` with `ChromaDB`
- LLM: `Mistral-7B-Instruct` via `HuggingFace` pipeline or `Ollama` locally

**What it does:**
- Scrapes 50–100 job postings (Epoch-style evaluation/research roles)
- Stores them in vector DB
- When user uploads CV + job link, retrieves relevant job requirements + similar portfolio examples
- Uses LLM with retrieved context to generate Gap Map + Idealized Profile

**Your learning:** Web crawling, data cleaning, basic RAG architecture, prompt engineering.

**Data feeding it:** Only job descriptions + user CVs + a small hand-labeled dataset of 20–30 "successful portfolio artifacts" (you manually collect from GitHub/public reports).

---

### Tier 2 — Fine-Tuned Gap Classifier (Months 3–5)
**What it is:** Your first **real bespoke model**. You fine-tune a small LLM on your crawled dataset specifically for gap classification and artifact recommendation.

**Tech:**
- Base model: `Llama 3.2 3B` or `Mistral 7B` (open weights, permissive licenses)
- Fine-tuning: `HuggingFace TRL` (Transformer Reinforcement Learning) or `Unsloth` (2× faster, less VRAM)
- Dataset format: JSON with pairs of `(CV_extracted_skills + job_description, gap_artifacts_list, ideal_profile_text)`
- Training: `QLoRA` (Quantized Low-Rank Adaptation) — trains on consumer GPU (RTX 3060/4060)

**Dataset you build by crawling:**
- 500+ job descriptions labeled by domain (evaluation, policy, research, strategy)
- 200+ portfolio artifacts (GitHub repos, reports) labeled by role relevance
- 100+ "transition narratives" — stories of people who moved into these roles with their portfolio path

**What the model learns:**
- Not "general chat." It learns: "Given CV skills X and aspiration role Y, the missing artifacts are specifically A, B, C — not generic 'learn Python'."

**Your learning:** Fine-tuning mechanics, dataset curation, evaluation metrics (BLEU/ROUGE for text, custom accuracy for artifact classification).

---

### Tier 3 — Multi-Agent + Market Signal Integration (Months 6–9)
**What it is:** The full Futuresume architecture. Multiple specialized small models + continuous signal ingestion.

**Components:**

| Component | Model / Approach | Data Source |
|---|---|---|
| **Signal Crawler Agent** | `Scrapy` + `spaCy` NER pipeline | Job boards, news, social, reports (continuous) |
| **Trend Classifier** | Fine-tuned `DistilBERT` / `RoBERTa` (small, fast) on market signal dataset | Labeled trend data: "growing demand" vs "reorganising" vs "declining" |
| **Gap Classifier** | Your fine-tuned `Mistral-7B` from Tier 2 | User CV + job URL + vector DB retrieval |
| **Identity Builder** | Fine-tuned `Llama-3.2-3B` specialized on Idealized Profile generation | Portfolio examples + user background + role family templates |
| **Offer Matcher** | Rule-based + RAG + small classifier (`scikit-learn` random forest or light neural net) on "service offer" dataset | Side business guides, pricing benchmarks, skill-to-service mappings |
| **Cohort Engine** | PostgreSQL + basic collaborative filtering (not heavy ML) | User progress data, peer reviews, collective outputs |

**Live signal integration:**
Every week, the crawler updates the vector DB. The Trend Classifier re-runs. If evaluation/research roles show +15% new openings and +3 new benchmark frameworks published, the Identity Builder adjusts recommendations ("Add benchmark contribution" becomes higher priority).

**Your learning:** Multi-agent orchestration, continuous learning pipelines, model evaluation in production, A/B testing outputs.

---

### Tier 4 — The Ideal (Year 2+)
**What it is:** Fully autonomous career-transition intelligence.

- **Self-updating fine-tune:** Every new crawl batch (weekly) feeds into a lightweight `continued pre-training` loop — the model learns emerging vocabulary (new evaluation methods, new role titles) without full retraining.
- **Personalization layer:** Per-user fine-tuning adapter (`LoRA` adapter per user cohort) — the model learns your specific writing style, domain background, and portfolio trajectory.
- **Predictive pathway:** Time-series forecasting (simple `Prophet` or `ARIMA` initially, later `LSTM`) on your artifact build progress + job market openness — predicts "likely ready for this role family in X weeks."

---

## 5. HOW YOU BUILD IT (Technical Path for Undergrad)

Given you're learning AI-ML: **don't build from scratch. Build on open weights, then specialize.**

### The "Real AI" Path (Not Just API Wrapping)

**Month 1–2: Foundation (No custom model yet)**
- Learn `Python` data pipelines: `pandas`, `numpy`, `BeautifulSoup`
- Build crawl dataset: 500 job descriptions saved as `.jsonl`
- Learn `scikit-learn`: `TF-IDF` + `LogisticRegression` to classify job families (basic but real ML)
- Learn RAG: `ChromaDB` + `Ollama` + `Mistral-7B`

**Month 3–4: Your First Fine-Tune**
- Gather labeled dataset (you hand-label 200 examples from your crawl)
- Use `Unsloth` to fine-tune `Llama-3.2-3B` with `QLoRA`
- Evaluate: Does the model recommend the same artifacts you would? (Custom evaluation: exact match + partial match on artifact categories)
- Deploy locally with `Ollama` or `vLLM`

**Month 5–6: Integration**
- Build API endpoint (`FastAPI`) that takes CV + job URL → runs fine-tuned model + RAG retrieval → outputs structured JSON
- Connect to your frontend (`Next.js` or keep GitHub Pages with embedded form calling API)

**Month 7–9: Signal Intelligence**
- Automate crawl schedule (`cron` + `Scrapy`)
- Build simple trend classifier (`DistilBERT` fine-tuned on 500 labeled news/job reports)
- Create feedback loop: user marks "this recommendation was useful" → updates dataset → future model improvement

---

## 6. THE DATASET YOU'RE BUILDING (Your Competitive Moat)

Every other career tool uses generic resume data. **Your crawl creates a proprietary evaluation/career-transition dataset.** This is your real AI asset.

| Dataset Component | Size Target | Source | Label Method |
|---|---|---|---|
| Job Requirement Corpus | 2,000+ descriptions | Lever, Workday, LinkedIn, direct company pages | Auto (NLP) + manual verification |
| Artifact Evidence Corpus | 500+ public examples | GitHub repos, arXiv, blog posts, portfolio sites | Hand-curated by domain |
| Transition Pathway Corpus | 300+ narratives | Interviews, forum posts, cohort outcomes, your own journey | Structured extraction |
| Market Signal Corpus | Continuous | News, reports, social | Auto-classified + weekly review |
| User Interaction Corpus | Growing daily | Your users' gap results, offer selections, cohort progress | Implicit feedback (clicks, completions, applications) |

**This dataset is what you fine-tune on.** It is also what makes Futuresume defensible: no one else has a dataset of "what artifacts actually close the gap for evaluation/research/strategic roles" linked to live market openings.

---

## 7. REVENUE-TO-AI CONNECTION (How Each Revenue Stream Funds Intelligence)

| Revenue Stream | Funds What Intelligence |
|---|---|
| Individual Credits (RM5/10) | Server costs for crawl + API calls; user interaction data collection |
| Cohort Package (RM199) | Labeled dataset generation (cohort outcomes = transition narratives); collective portfolio corpus |
| Side Business Toolkit | Data on which offers work; pricing benchmarks; skill-to-service mapping dataset |
| Certification/Course Affiliate | Structured pathway data; cert-to-artifact mapping for Roadmap |
| Marketplace/Referral (Future) | Real market pricing data; buyer demand signals |

---

## 8. MVP CHECKLIST (What You Launch First)

Use this to stay focused while learning.

**Week 1–2:** Crawl 50 job descriptions (Epoch-style + similar evaluation/research roles). Save as JSON.
**Week 3:** Build basic `BeautifulSoup` + `spaCy` extractor. Label 20 examples by hand.
**Week 4:** Set up `Mistral-7B` via `Ollama`. Build first RAG pipeline.
**Week 5:** Connect to your form (`#hc-role` + `#hc-bg`). Return mock results using RAG + rules.
**Week 6:** Start collecting user interactions. Every analysis feeds the dataset.
**Month 2:** Fine-tune first `Llama-3.2-3B` adapter on 100 labeled gap examples. Deploy locally.
**Month 3:** Automate crawl. Add news signal ingestion.
**Month 4:** Launch cohort layer with collective portfolio tracking.

**Your "real AI" at each stage:**
- Month 1: Real crawl pipeline + RAG (not just ChatGPT API)
- Month 2: First fine-tuned adapter (bespoke to your domain)
- Month 3: Continuous learning loop (crawl → dataset → model update)
- Month 4+: Multi-agent system with proprietary dataset

---

## Final MD Statement for AI Architecture

**Futuresume's AI is not a chatbot. It is a proprietary evaluation-intelligence system built on continuously crawled market signals, fine-tuned open-weight models, and user-generated portfolio transition data. The MVP starts with web crawling and RAG. The bespoke value comes from the dataset you build by crawling — and the fine-tuned adapters you train on it. Every revenue stream (credits, cohorts, toolkits, referrals) feeds data back into the intelligence layer, making the system more accurate and more defensible with every user.**

Build the crawl first. The model follows the data.
