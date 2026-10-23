# Practise in an AI-delegated world: research and concise findings

**Context:** Flipkart APM Prompt 1; research consolidated on 23 October 2026.

**Scope:** The research and product exploration discussed in this conversation: AI delegation, independent reasoning, motivation, achievement, brain training, existing interventions, and a possible practice product.

**Status:** Evidence synthesis and proposed product direction. No user study or product efficacy test has been conducted. The mission-based concept is recommended, not yet selected by the user.

**Method:** Targeted review of 12 research sources and four product examples, prioritising original papers and official product pages. This is not a systematic review or an exhaustive market map. Study findings, our interpretations, and future-world assumptions are separated below.

## 1. Findings at a glance

| Finding | Evidence boundary | Product implication |
| --- | --- | --- |
| Better AI-assisted output does not necessarily mean better independent learning. | Demonstrated in specific learning experiments; not universal across all AI use. [R1, R2] | Measure performance after assistance is removed. |
| The design of assistance matters. | Hint-based safeguards and structured tutors have produced different outcomes from answer-oriented assistance. [R1, R6] | Preserve opportunities for the user to reason; evaluate the particular design. |
| Higher trust in AI can accompany less reported critical-thinking effort. | Survey association, not proof of causal or permanent skill decline. [R3] | Observe actual reasoning behaviour rather than assuming usage causes deterioration. |
| Motivation and competence are separate outcomes. | Experimental motivation results and psychological theory inform the distinction. [R4, R10] | Measure both independent ability and perceived ownership. |
| Effort can be valued even when it is costly. | A review supports the general possibility, not demand for our product. [R11] | Make practice voluntarily worthwhile through curiosity and mastery. |
| Improving at a brain game does not establish better everyday reasoning. | Reviews and an active-control trial limit broad transfer claims. [R8, R9] | Test unfamiliar problems and delayed retention. |
| Extra thinking can create unwanted friction. | A controlled AI decision-support study found a satisfaction trade-off. [R5] | Use optional, graded support and observe abandonment. |
| The dopamine explanation is not established. | Reward neuroscience distinguishes wanting, liking and learning. [R12] | Avoid dopamine restoration, neurological-health and global-intelligence claims. |
| A standalone practice product must outperform readily available alternatives. | Interactive lessons and guided AI tutoring already exist. [P1–P4] | Test against ordinary tutoring and a general agent, not only against no practice. |

**Defensible opportunity statement:** In a world where agents perform everyday tasks, some people may want chosen opportunities to exercise judgement, experience accomplishment, and see what they can do independently. Whether that need sustains repeated use or payment remains unverified.

## 2. How the problem was narrowed

The workshop example moved from a broad goal to user groups, user jobs, a specific barrier, and then a product. We applied the same reasoning sequence:

`Future-world assumption → affected user → desired outcome → barrier → intervention → evidence of benefit`

| User–job intersection | Candidate problem | Discussion outcome |
| --- | --- | --- |
| Overloaded delegators × Control | Broad delegation can make selected decisions difficult to reserve for oneself. | Plausible; native permission controls are a strong alternative. |
| People changing direction × Grow | Experiences may continue to reflect earlier preferences. | Needs care: a poorly informed agent can contradict the prompt's premise. Exploring unfamiliar possibilities is a stronger version. |
| People growing up with agents × Practise | Delegation can remove occasions to develop abilities independently. | User selected this direction. It can matter even when AI is capable. |
| Provider-dependent users × Leave | Switching providers can threaten continuity across daily life. | Plausible; interoperability and provider cooperation are major dependencies. |

These are strategic hypotheses, not findings from the cited studies. The 2040 scenario is a case assumption, not an empirical forecast.

The original mental-gym hypothesis combined three claims: reduced practice, diminished independent ability, and reduced achievement-related dopamine. The reviewed evidence supports investigating practice and learning; it does not establish that complete causal chain.

## 3. Research evidence

### R1. Bastani et al. (2025): assisted performance versus learning

**Paper:** [Generative AI without guardrails can harm learning: Evidence from high school mathematics](https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/) — PNAS.

- **Design:** Randomised field experiment with nearly 1,000 high-school mathematics students in Turkey; compared standard-style GPT assistance, a safeguarded tutor, and a control condition.
- **Finding:** Assisted practice grades improved by 48% with GPT Base and 127% with GPT Tutor relative to control. On subsequent unaided exams, GPT Base students scored 17% lower relative to control. These are relative differences, not percentage-point changes.
- **Boundary:** Tutor safeguards mitigated the negative effect; this does not establish superior unaided exam learning. The study concerns skill acquisition in a particular setting, not permanent loss of previously mastered general intelligence.
- **Our implication:** Success during assistance is an inadequate learning metric. Preserve and assess independent attempts.

### R2. Shen and Tamkin (2026): coding skill formation

**Paper:** [How AI Impacts Skill Formation](https://arxiv.org/abs/2601.20245) — arXiv preprint. [Authors' research summary](https://www.anthropic.com/research/AI-assistance-coding-skills).

- **Design:** Experiment with 52 developers learning an unfamiliar Python library, with or without AI assistance.
- **Finding:** The AI group averaged 50% on the assessment, compared with 67% for the comparison group: a **17-percentage-point** gap. Average efficiency gains were not statistically significant.
- **Boundary:** Small, task-specific study of early learning; not evidence of long-term general decline. Observed interaction-pattern subgroups do not establish causal benefits of a particular usage style.
- **Our implication:** Assess whether users can explain, diagnose and solve independently after obtaining help.

### R3. Lee et al. (2025): critical-thinking effort at work

**Paper:** [The Impact of Generative AI on Critical Thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/) — CHI.

- **Design:** Survey of 319 knowledge workers describing 936 examples of GenAI use.
- **Finding:** Greater confidence in AI was associated with less reported critical thinking; greater task-specific self-confidence was associated with more. Thinking also shifted toward verification, integration and stewardship.
- **Boundary:** Self-reported and correlational. It does not demonstrate that AI caused an objective loss of reasoning skill.
- **Our implication:** Observe evidence checking, explanation and revision directly; do not infer capability from confidence or frequency of AI use.

### R4. Wu et al. (2025): performance, control and motivation

**Paper:** [Human-generative AI collaboration enhances task performance but undermines human's intrinsic motivation](https://www.nature.com/articles/s41598-025-98385-2) — Scientific Reports.

- **Design:** Four online experimental studies, total N = 3,562.
- **Finding:** AI collaboration improved immediate performance, but the advantage did not persist in subsequent independent tasks. Moving from AI collaboration to solo work increased perceived control while reducing intrinsic motivation and increasing boredom.
- **Boundary:** Short experimental tasks do not establish lifelong motivational deterioration or dopamine changes.
- **Our implication:** Removing AI is not sufficient to make an activity satisfying. Independent practice must offer a reason to participate.

### R5. Buçinca, Malaya and Gajos (2021): useful friction has costs

**Paper:** [To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making](https://arxiv.org/abs/2102.09692).

- **Design:** Controlled experiment with 199 participants, comparing cognitive-forcing designs, explanation-based assistance, and a no-AI baseline.
- **Finding:** Cognitive-forcing interventions reduced overreliance compared with simple explanations. The most effective designs received less favourable subjective ratings; benefits differed with motivation to engage in effortful thinking.
- **Boundary:** Reduced overreliance in the tested decisions is not proof of durable skill acquisition.
- **Our implication:** Introduce reasoning opportunities deliberately, while testing whether people tolerate and voluntarily return to them.

### R6. Kestin et al. (2025): AI can support learning

**Paper:** [AI tutoring outperforms in-class active learning: an RCT introducing a novel research-based design in an authentic educational setting](https://www.nature.com/articles/s41598-025-97652-6) — Scientific Reports.

- **Design:** Randomised crossover study of two undergraduate physics lessons; 194 students in the analysed study population.
- **Finding:** A structured, research-informed AI tutor produced stronger immediate learning outcomes with less time than the active-learning classroom condition.
- **Boundary:** Specific lessons, tutor design and comparator; not evidence that any chatbot improves learning or that gains persist indefinitely. The comparison does not isolate AI from all differences in pacing and instructional design.
- **Our implication:** AI can be the practice coach. Evaluate the instructional experience rather than treating AI presence as inherently harmful.

### R7. Kazemitabaar et al. (2024): CodeAid

**Paper:** [CodeAid: Evaluating a Classroom Deployment of an LLM-based Programming Assistant that Balances Student and Educator Needs](https://arxiv.org/abs/2401.11314) — CHI.

- **Built intervention:** A programming assistant providing conceptual explanations, pseudocode and suggestions without directly supplying complete code solutions.
- **Deployment:** A class of 700 students over 12 weeks; analysis of roughly 8,000 uses, surveys and 22 student interviews, with educator interviews.
- **Finding:** The deployment identifies practical tensions between helpfulness, cognitive engagement, transparency and user control.
- **Boundary:** Deployment and qualitative evidence, not a randomised demonstration of improved independent learning.
- **Our implication:** Guidance without immediate solution delivery is already explored. Differentiation must extend beyond withholding answers.

### R8. Simons et al. (2016): limits of brain-training transfer

**Paper:** [Do "Brain-Training" Programs Work?](https://pubmed.ncbi.nlm.nih.gov/27697851/) — Psychological Science in the Public Interest.

- **Design:** Review of the brain-training evidence base.
- **Finding:** Stronger evidence supports improvement on trained tasks; support is weaker for closely related tasks and limited for broad everyday cognitive benefits.
- **Boundary:** This is not proof that all practice or every training intervention is ineffective.
- **Our implication:** Specify the trained ability and test whether it transfers. Do not equate game-score improvement with general intelligence.

### R9. Kable et al. (2017): commercial brain training versus an active control

**Paper:** [No Effect of Commercial Cognitive Training on Brain Activity, Choice Behavior, or Cognitive Performance](https://pmc.ncbi.nlm.nih.gov/articles/PMC5546110/) — Journal of Neuroscience.

- **Design:** Ten-week trial; final analysed sample of 128 healthy young adults, comparing Lumosity training with ordinary online games.
- **Finding:** Commercial training did not produce superior broad cognitive, decision-making or neural outcomes relative to the active control, despite gains on trained activities.
- **Boundary:** One programme, population, duration and outcome set; not a verdict on every current product or specialised intervention.
- **Our implication:** Use an active comparator. A before-and-after improvement alone can reflect repeated testing or general engagement.

### R10. Ryan and Deci (2000): autonomy and competence

**Paper:** [Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being](https://www.selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf) — American Psychologist.

- **Framework:** Autonomy, competence and relatedness help explain motivation and well-being.
- **Boundary:** This is a theoretical and research synthesis, not a trial of AI delegation or a mental-gym product.
- **Our implication:** Let users choose a meaningful challenge, experience achievable progress and understand their contribution. These are design hypotheses requiring evaluation.

### R11. Inzlicht, Shenhav and Olivola (2018): the effort paradox

**Paper:** [The Effort Paradox: Effort Is Both Costly and Valued](https://pubmed.ncbi.nlm.nih.gov/29477776/) — Trends in Cognitive Sciences.

- **Finding:** Effort can be avoided as a cost yet also contribute value to an activity or its outcome.
- **Boundary:** This does not establish that effort is always enjoyable, that more difficulty is better, or that users will pay for deliberate cognitive practice.
- **Our implication:** Chosen challenge is a plausible product foundation even when an easier automated route exists. Validate the particular experience.

### R12. Berridge and Kringelbach (2015): why dopamine is the wrong product claim

**Paper:** [Pleasure Systems in the Brain](https://pubmed.ncbi.nlm.nih.gov/25950633/) — Neuron.

- **Finding:** Reward involves distinguishable processes of wanting, liking and learning; dopamine is not a simple measure of pleasure or accomplishment.
- **Boundary:** The review does not study whether personal AI causes a dopamine deficit.
- **Our implication:** Describe earned accomplishment, autonomy and motivation in behavioural terms. Do not promise to restore dopamine or infer brain chemistry from app engagement.

## 4. What people have already built

Official pages establish product positioning and described features, not independent efficacy. Features can change; this is a snapshot checked during the research.

| ID / example | Existing approach | Relevant lesson | What it does not establish |
| --- | --- | --- | --- |
| P1: [Lumosity](https://www.lumosity.com/en/brain-training/) | Cognitive games and practice across several abilities. | Short exercises and progression are established patterns. | Broad transfer or prevention of AI-related skill loss. |
| P2: [Elevate](https://elevateapp.com/skills/math-skills) | Practice framed around applied skills such as everyday mathematics. The cited page now redirects to The Mind Company. | Specific skill promises are clearer than a general brain score. | Efficacy of our proposed intervention. |
| P3: [Brilliant](https://brilliant.org/topics/logic/) | Interactive logic learning, feedback and progressive practice. | Learning by doing and adaptive exercises are not new. | A unique market gap for another exercise app. |
| P4: [Khanmigo](https://khanmigo.ai/) | AI-guided learning that encourages students to work through problems. | An AI coach can support the process rather than give the answer immediately. | Durable benefits for our target users or scenarios. |

CodeAid [R7] and the structured physics tutor [R6] are additional research-built examples. Neither should be conflated with proof that all commercial AI tutors work.

## 5. First-principles synthesis

### Separate the jobs

| User job | Observable success | Misleading substitute |
| --- | --- | --- |
| "I want to remain able to think for myself." | Better performance on fresh problems without assistance; retained after a delay. | A higher score on repeatedly practised missions. |
| "I want to feel I accomplished something myself." | The user can identify their contribution and reports ownership of it. | Completion, praise or reward points alone. |
| "I want practice that I willingly return to." | Repeat participation without coercive reminders or streak pressure. | Initial curiosity or stated enthusiasm in an interview. |

### Causal chain to test

`Delegation reduces some practice occasions → independent practice may become insufficient → a voluntary intervention restores useful practice → specific unaided abilities improve or are maintained.`

Every arrow is conditional. The literature does not establish this complete chain for the 2040 population. Maintaining an already acquired skill also needs different evidence from teaching a new one.

### Assumptions still open

- Which users already notice or act on a desire for independent practice?
- Which abilities matter enough for them to devote time to practising?
- Does a useful experience remain desirable when the agent is highly competent?
- Will users value the activity itself, beyond anxiety about dependence?
- Can the intervention improve unfamiliar-task performance?
- Can it outperform a general agent asked to coach the same skill?
- Who pays, and what evidence would justify continued payment?

## 6. Product directions considered

These are proposed alternatives, not user-approved implementation plans.

| Direction | Core experience | Strength | Main uncertainty |
| --- | --- | --- | --- |
| A. Personal mental gym | Short, focused exercises with feedback. | Simple to prototype and evaluate. | Weak differentiation; narrow game-specific gains. |
| B. Mission-based practice world | Investigate a situation, choose evidence, decide and observe consequences. | A concrete experience of reasoning and earned accomplishment. | Content quality, voluntary return and transfer outside the missions. |
| C. Real-life practice layer | Reserve selected parts of actual projects for the user. | Immediate relevance and visible personal contribution. | Workflow friction, integration and consequences of mistakes. |

**Current recommendation: B, working name "Own It".** This is a strategic judgement, not an experimentally supported ranking. It offers a bounded prototype without depending on agent-provider integrations. The user's subsequent request to document and publish the research does not itself select B.

## 7. Recommended concept, made concrete

**Promise:** Discover what you can do when the thinking is yours.

**Proposed first user:** An adult who delegates heavily but already seeks opportunities to challenge themselves. Ages 18–25 were suggested as a recruitment starting point, not a validated segment. Behaviour and motivation matter more than age alone.

**Initial skill family:** Evaluating evidence before choosing an action.

### Example mission

A fictional community music event is losing attendance. The organiser blames ticket prices. The user investigates records, compares affected groups, considers alternative explanations and chooses an intervention.

One authored scenario could reveal that a transport change explains the pattern better than ticket prices. That is a hypothetical scenario design, not a real-world finding. The simulation must define its evidence and rules consistently, allow insufficient-evidence conclusions, and distinguish good reasoning from lucky outcomes.

`Initial view → select evidence → compare explanations → decide → observe consequences → reflect → attempt an unfamiliar related problem`

AI may provide optional questions, dialogue or reviewed variations. The user retains the central reasoning. A hint should point to a useful question without silently making every inference. Complete explanations remain available when needed; assistance is recorded honestly and followed by a fresh independent attempt. External AI use cannot be perfectly prevented.

### Smallest credible prototype

1. One reviewed, branching mission.
2. A graduated hint system.
3. A debrief that identifies specific reasoning behaviours and uncertainty.
4. A different unaided follow-up problem using the same underlying skill.

A structured simulation is enough to test the concept. Open-ended generation is optional. No biometric signals, dopamine measurement, universal intelligence score, multiplayer system or agent integration is necessary for the first test.

### Longer-term ambition

A coherent practice world could offer connected missions, chosen themes, increasingly demanding decisions, optional cooperative experiences and evidence of specific independent progress. Real-world application would be the strongest aspiration, but must be demonstrated rather than inferred from engagement. These expansions remain unapproved possibilities.

## 8. Validation plan and decisions it should drive

This is a proposed evaluation, not a completed study. Do not invent success rates, market sizes or sample-size precision.

### Stage 1: validate the demand

Recruit people who have already tried to learn, solve or create without outsourcing all the reasoning. Ask for a recent example, what they did, why it mattered and what they gave up to do it. Observe their response to a playable mission; stated concern about AI alone is weak demand evidence.

### Stage 2: compare the experience fairly

Compare the mission prototype with matched static practice and ordinary guided AI tutoring. Match the skill objective, available practice time and assessment difficulty; randomise where feasible. Choose sample size and primary outcomes before a confirmatory study. A small usability pilot can reveal friction, but cannot prove durable learning.

| Outcome | Proposed measurement | Interpretation |
| --- | --- | --- |
| Independent skill | Blindly scored fresh problems completed without help. | Directly tests the learning claim within the specified domain. |
| Retention | A delayed, new assessment with comparable difficulty. | Distinguishes short-lived performance from retained ability. |
| Confidence calibration | Compare confidence judgements with actual performance. | Detects false reassurance. |
| Ownership | User explanation of their contribution plus perceived ownership. | Assesses accomplishment separately from ability. |
| Voluntary return | Observe whether people choose another session. | Tests repeat value, not only novelty. |
| Friction | Hint requests, abandonment points and reported frustration. | Helps distinguish productive difficulty from poor design. |
| Payment | A concrete, transparent purchase choice after experiencing value. | Stronger demand evidence than hypothetical willingness to pay. |

### Decision rules to define before testing

- **Enjoyment without learning:** Consider an entertainment proposition; do not market cognitive protection.
- **Learning without voluntary return:** Rework the experience or consider a structured learning setting.
- **Confidence without ability:** Treat as a harmful mismatch; revise feedback and claims.
- **No advantage over a general agent:** Reconsider whether a separate product is justified.
- **Verified learning and voluntary return:** Expand within the validated skill family before adding unrelated abilities.

Numeric thresholds require an agreed baseline, meaningful effect size and adequate statistical power. None has been established in this research.

## 9. Concise findings for the APM case

1. The opportunity is to preserve chosen opportunities for independent thinking in an agent-mediated life.
2. AI-assisted performance and independent competence must be measured separately.
3. Current evidence supports a learning-design question, not a universal claim that AI damages intelligence.
4. Motivation, ownership and competence are different outcomes; a product may improve one without another.
5. The dopamine narrative should be removed from the product rationale.
6. Practice must target a defined skill and demonstrate transfer to unfamiliar tasks.
7. A mission may make practice more attractive, but that advantage is a hypothesis.
8. The first prototype should expose one complete reasoning loop rather than showcase many features.
9. A personal agent, interactive lesson and ordinary practice exercise are serious substitutes.
10. The strongest evidence for proceeding would combine independent learning, voluntary return and clear user ownership.

**Suggested problem statement:** People growing up with capable personal agents may have fewer occasions to exercise judgement independently. For those who value retaining that ability, we propose voluntary, meaningful practice with evidence of what they can do without assistance.

**Suggested solution hypothesis:** A mission-based practice experience can make evidence evaluation enjoyable and personally owned, while testing whether the resulting ability transfers to unfamiliar problems.

**Open decision:** Select the primary product experience—mental gym, mission world or real-life practice layer—before converting this research into a final submission or build plan.

---

**Source notes:** R1–R12 and P1–P4 link to the underlying sources beside the relevant summaries. Counts, study designs and reported effects are attributed to those sources; proposed segments, features and evaluation choices are our synthesis. This document consolidates the conversation's research and does not claim to include every relevant publication. It is a research appendix, not the final two-page APM submission.
