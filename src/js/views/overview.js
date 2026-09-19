// Screen 1: Employee Dashboard / Overview View matching Stitch specs

import { userProfile, targetOpportunity, candidateMarketplace } from '../data.js';

export function renderOverviewView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Dynamic Greeting & Executive Control Bar -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-1">
            <h1 class="font-display text-2xl font-bold text-on-surface tracking-tight">Good morning, Alex</h1>
            <span class="text-xl animate-pulse">👋</span>
            <span class="ml-2 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] uppercase tracking-wider font-semibold">Q3 Active Horizon</span>
          </div>
          <p class="text-xs text-on-surface-variant max-w-2xl">
            Here's your career mobility trajectory, algorithmic skill progression, and real-time AI talent overview for Q3.
          </p>
        </div>

        <!-- Quick Actions Group -->
        <div class="flex items-center gap-3 self-start lg:self-auto">
          <button id="logSkillBtn" class="group flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-on-surface shadow-xs hover:shadow-md hover:bg-surface-container-low transition-all border border-surface-container-high" type="button">
            <span class="material-symbols-outlined text-primary text-lg transition-transform group-hover:rotate-90">add_circle</span>
            <span class="text-xs font-semibold">Log Skill Evidence</span>
          </button>
          <a href="#/internal-opportunities" class="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 transition-all">
            <span class="material-symbols-outlined text-primary-fixed-dim text-lg transition-transform group-hover:scale-110">auto_awesome</span>
            <span class="text-xs font-semibold">Explore 6 Matched Roles</span>
            <span class="flex h-2 w-2 relative ml-1">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-fixed"></span>
            </span>
          </a>
        </div>
      </div>

      <!-- Stat Metrics Grid (4 Elevated Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-2">
        <!-- Card 1: Skill Match Index -->
        <div class="relative bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border border-surface-container">
          <div class="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Skill Match Index</span>
              <span class="flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant">
                <span class="material-symbols-outlined text-xs mr-0.5">trending_up</span>+4.2%
              </span>
            </div>
            <div class="flex items-baseline gap-2 mb-1">
              <span class="font-display text-3xl text-on-surface font-bold">94%</span>
              <span class="text-[11px] text-outline">aggregate index</span>
            </div>
          </div>
          <div class="flex items-center gap-3 pt-3">
            <div class="relative w-10 h-10 flex-shrink-0">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path class="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3.5"/>
                <path class="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="94, 100" stroke-linecap="round" stroke-width="3.5"/>
              </svg>
              <span class="material-symbols-outlined absolute inset-0 m-auto text-sm text-primary-container flex items-center justify-center">verified</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-outline">Career Track Vector</span>
              <span class="text-xs text-primary font-semibold leading-tight">Ready for Principal / Staff</span>
            </div>
          </div>
        </div>

        <!-- Card 2: AI Career Readiness -->
        <div class="relative bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border border-surface-container">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">AI Career Readiness</span>
              <span class="material-symbols-outlined text-secondary text-lg">psychology</span>
            </div>
            <div class="flex items-baseline gap-2 mb-1">
              <span class="font-display text-3xl text-on-surface font-bold">88%</span>
              <span class="text-[11px] text-outline">readiness score</span>
            </div>
          </div>
          <div class="flex flex-col gap-1.5 pt-3">
            <div class="flex justify-between items-center text-[11px]">
              <span class="text-on-surface-variant font-medium">14 Verified Competencies</span>
              <span class="text-secondary font-semibold">2 In Review</span>
            </div>
            <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
              <div class="bg-primary-container h-full rounded-full" style="width: 87.5%"></div>
              <div class="bg-secondary-fixed-dim h-full" style="width: 12.5%"></div>
            </div>
            <span class="text-[10px] text-outline mt-0.5">Assessed across 4 enterprise domains</span>
          </div>
        </div>

        <!-- Card 3: Active Learning Hours -->
        <div class="relative bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border border-surface-container">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Active Learning</span>
              <span class="text-[11px] text-primary font-semibold">77% Target</span>
            </div>
            <div class="flex items-baseline gap-1.5 mb-1">
              <span class="font-display text-3xl text-on-surface font-bold">38.5</span>
              <span class="text-xs text-outline">/ 50 hrs</span>
            </div>
          </div>
          <div class="flex flex-col gap-1.5 pt-3">
            <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div class="bg-primary h-full rounded-full transition-all duration-700" style="width: 77%"></div>
            </div>
            <div class="flex items-center justify-between text-[11px] pt-1">
              <span class="text-on-surface-variant flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-primary-container">workspace_premium</span>
                2 Certifications Underway
              </span>
              <span class="text-outline">11.5h left</span>
            </div>
          </div>
        </div>

        <!-- Card 4: Internal Mobility Matches -->
        <div class="relative bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden border border-surface-container">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Mobility Matches</span>
              <span class="p-1 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">Live Feed</span>
            </div>
            <div class="flex items-baseline gap-2 mb-1">
              <span class="font-display text-3xl text-on-surface font-bold">6</span>
              <span class="text-xs text-on-surface-variant font-medium">Active Openings</span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-3 bg-surface-container-low/70 p-2 rounded-xl">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
              <span class="text-[11px] text-on-surface font-medium">3 High Fit (>90%)</span>
            </div>
            <div class="flex items-center gap-1 text-secondary font-semibold text-[11px]">
              <span class="material-symbols-outlined text-xs">schedule</span>
              <span>2 In Interview</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Layout Grid (8 / 4 Asymmetric Split) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- LEFT COLUMN (8 Columns) -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <!-- AI Explainable Recommendation Banner -->
          <div class="relative bg-white rounded-2xl p-6 shadow-md overflow-hidden border border-surface-container">
            <div class="absolute -right-16 -bottom-16 w-80 h-80 bg-gradient-to-tr from-secondary-fixed/40 via-primary-fixed/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-primary-container to-secondary"></div>
            
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold shadow-xs">
                <span class="material-symbols-outlined text-xs text-secondary">model_training</span>
                <span>TALENT MATCH ENGINE • 94% CONFIDENCE</span>
              </div>
              <span class="text-[11px] text-outline">Inference ID: #TLP-8842-AX</span>
            </div>

            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div class="flex flex-col">
                <span class="text-[11px] uppercase tracking-wider text-outline font-semibold mb-1">Recommended Career Pivot</span>
                <h3 class="font-display text-xl font-bold text-on-surface tracking-tight">
                  Staff AI Solutions Architect & Enterprise Lead
                </h3>
                <p class="text-xs text-on-surface-variant mt-1">
                  Autonomous Systems & Platform Operations • Global Infrastructure Team
                </p>
              </div>
              <div class="flex-shrink-0 flex md:flex-col items-center md:items-end justify-between bg-surface-container-low p-3.5 rounded-xl border border-surface-container">
                <span class="text-[10px] text-outline">Projected Band</span>
                <span class="text-sm font-bold text-on-surface">$185k - $215k</span>
                <span class="text-[11px] text-primary font-semibold">Tier L6 • IC Path</span>
              </div>
            </div>

            <!-- Verified Capability Pills -->
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-xs">
                <span class="material-symbols-outlined text-primary-container text-base">check_circle</span>
                <span class="font-medium">Distributed Systems</span>
                <span class="text-[10px] text-primary font-semibold ml-1">Expert</span>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-xs">
                <span class="material-symbols-outlined text-primary-container text-base">check_circle</span>
                <span class="font-medium">ML Ops & LLM Orchestration</span>
                <span class="text-[10px] text-primary font-semibold ml-1">Advanced</span>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-xs">
                <span class="material-symbols-outlined text-primary-container text-base">check_circle</span>
                <span class="font-medium">Cross-functional Leadership</span>
                <span class="text-[10px] text-primary font-semibold ml-1">Strong</span>
              </div>
            </div>

            <!-- Reasoning Panel -->
            <div class="bg-surface-container-low rounded-xl p-4 mb-4 flex flex-col gap-2 border border-surface-container">
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-secondary text-lg mt-0.5">psychology_alt</span>
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-on-surface">Algorithmic Match Justification</span>
                  <p class="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                    Identified based on your 3 successfully delivered cloud migrations, 2 internal patents filed with Infrastructure, and elevated peer synthesis marks (>4.8/5) across Engineering and Product.
                  </p>
                </div>
              </div>
            </div>

            <!-- Banner Actions -->
            <div class="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div class="flex items-center gap-1 text-outline text-[11px]">
                <span class="material-symbols-outlined text-sm text-primary">verified_user</span>
                <span>Hiring Manager: Rachel Vance (VP Engineering)</span>
              </div>
              <div class="flex items-center gap-3">
                <a href="#/ai-career-assistant" class="px-4 py-2 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold hover:bg-surface-container transition-colors">
                  View Role Blueprint
                </a>
                <button id="applyExpressBtn" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs">
                  <span class="material-symbols-outlined text-base">send</span>
                  <span>Apply via 1-Click Mobility</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Internal Openings List -->
          <div class="bg-white rounded-2xl p-6 shadow-xs border border-surface-container">
            <div class="flex items-center justify-between mb-4">
              <div class="flex flex-col">
                <h4 class="font-display text-lg font-bold text-on-surface">Top Matched Internal Openings</h4>
                <span class="text-xs text-outline">Ranked by real-time neural talent graph scoring</span>
              </div>
              <a href="#/internal-opportunities" class="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                Browse all 18 vacancies <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div class="flex flex-col gap-3">
              <!-- Opening 1 -->
              <div class="p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 border border-surface-container">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                    AI
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-bold text-on-surface">Senior ML Infrastructure Architect</span>
                      <span class="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-semibold">94% Match</span>
                    </div>
                    <div class="flex items-center gap-2 text-outline text-[11px] mt-0.5">
                      <span>Core Platform Engineering</span>
                      <span>•</span>
                      <span>San Francisco, CA (Hybrid)</span>
                      <span>•</span>
                      <span class="font-semibold text-on-surface-variant">L5/L6 Band</span>
                    </div>
                  </div>
                </div>
                <button class="express-interest-btn px-3 py-1.5 rounded-lg bg-white text-on-surface text-xs font-semibold hover:bg-primary hover:text-white transition-all border border-surface-container shadow-xs self-start md:self-auto">
                  Express Interest
                </button>
              </div>

              <!-- Opening 2 -->
              <div class="p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 border border-surface-container">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-sm flex-shrink-0">
                    DX
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-bold text-on-surface">Principal Enterprise Systems Engineer</span>
                      <span class="px-2 py-0.5 rounded-full bg-secondary text-white text-[10px] font-semibold">91% Match</span>
                    </div>
                    <div class="flex items-center gap-2 text-outline text-[11px] mt-0.5">
                      <span>Developer Experience & Ops</span>
                      <span>•</span>
                      <span>Austin, TX (Remote)</span>
                      <span>•</span>
                      <span class="font-semibold text-on-surface-variant">L6 Band</span>
                    </div>
                  </div>
                </div>
                <button class="express-interest-btn px-3 py-1.5 rounded-lg bg-white text-on-surface text-xs font-semibold hover:bg-primary hover:text-white transition-all border border-surface-container shadow-xs self-start md:self-auto">
                  Review Intro
                </button>
              </div>
            </div>
          </div>

          <!-- Career Progression Milestone Vector Stepper -->
          <div class="bg-white rounded-2xl p-6 shadow-xs border border-surface-container">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <div>
                <h4 class="font-display text-lg font-bold text-on-surface">Career Progression Milestone Vector</h4>
                <span class="text-xs text-outline">Targeting Staff / Principal IC Level promotion readiness in Q4</span>
              </div>
              <span class="text-xs font-semibold text-primary">Velocity: On Fast Track (+18%)</span>
            </div>

            <div class="relative py-2">
              <div class="flex flex-col gap-4">
                <!-- Step 1 -->
                <div class="flex items-start gap-4 p-3.5 rounded-xl bg-surface-container-low">
                  <div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-xs flex-shrink-0">
                    <span class="material-symbols-outlined text-base">check</span>
                  </div>
                  <div class="flex flex-col flex-1">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-semibold text-on-surface">Stage 1: Senior Systems Analyst</span>
                      <span class="text-[10px] px-2 py-0.5 rounded bg-primary-container text-white font-medium">Completed Q1</span>
                    </div>
                    <p class="text-[11px] text-on-surface-variant mt-0.5">
                      Validated 8 core capabilities including High-throughput Kafka Stream Analysis and Microservice Orchestration.
                    </p>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="flex items-start gap-4 p-3.5 rounded-xl bg-white shadow-xs border-l-4 border-l-secondary border border-surface-container">
                  <div class="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs flex-shrink-0 ring-2 ring-secondary-fixed/40">
                    <span class="material-symbols-outlined text-base">sync</span>
                  </div>
                  <div class="flex flex-col flex-1">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-on-surface">Stage 2: Lead Architect Track Acceleration</span>
                      <span class="text-[10px] font-semibold text-secondary">72% Active Progress</span>
                    </div>
                    <p class="text-[11px] text-on-surface-variant mt-0.5">
                      Cross-departmental leadership validation & multi-tenant cloud security specialization underway.
                    </p>
                  </div>
                </div>

                <!-- Step 3 -->
                <div class="flex items-start gap-4 p-3.5 rounded-xl bg-surface-container-low/40">
                  <div class="w-8 h-8 rounded-full bg-surface-container-high text-outline flex items-center justify-center flex-shrink-0">
                    <span class="material-symbols-outlined text-base">flag</span>
                  </div>
                  <div class="flex flex-col flex-1">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-medium text-on-surface">Stage 3: Principal Lead & Strategic Advisor</span>
                      <span class="text-[10px] text-outline">Est. Nov 2024</span>
                    </div>
                    <p class="text-[11px] text-outline mt-0.5">
                      Target milestone: Present technical vision deck to Architecture Review Board & finalize talent sponsorship.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN (4 Columns) -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <!-- Skill Radar & Proficiency Matrix -->
          <div class="bg-white rounded-2xl p-5 shadow-xs border border-surface-container">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-display text-base font-bold text-on-surface">Skill Proficiency Matrix</h4>
              <span class="material-symbols-outlined text-outline text-lg">tune</span>
            </div>

            <!-- Custom SVG Radar Diagram -->
            <div class="relative w-full aspect-square max-w-[220px] mx-auto my-2 flex items-center justify-center">
              <svg class="w-full h-full" viewBox="0 0 200 200">
                <polygon class="text-surface-container-high" fill="none" points="100,20 180,100 100,180 20,100" stroke="currentColor" stroke-width="1.5"/>
                <polygon class="text-surface-container-high" fill="none" points="100,45 155,100 100,155 45,100" stroke="currentColor" stroke-width="1.5"/>
                <polygon class="text-surface-container-high" fill="none" points="100,70 130,100 100,130 70,100" stroke="currentColor" stroke-width="1.5"/>
                <line class="text-surface-container-high" stroke="currentColor" stroke-dasharray="3,3" stroke-width="1.5" x1="100" y1="20" x2="100" y2="180"/>
                <line class="text-surface-container-high" stroke="currentColor" stroke-dasharray="3,3" stroke-width="1.5" x1="20" y1="100" x2="180" y2="100"/>
                <polygon class="text-primary-container" fill="rgba(22, 167, 101, 0.25)" points="100,26.4 170.4,100 100,164 31.2,100" stroke="currentColor" stroke-width="2.5"/>
                <circle class="text-primary" cx="100" cy="26.4" r="4" fill="currentColor"/>
                <circle class="text-primary" cx="170.4" cy="100" r="4" fill="currentColor"/>
                <circle class="text-primary" cx="100" cy="164" r="4" fill="currentColor"/>
                <circle class="text-primary" cx="31.2" cy="100" r="4" fill="currentColor"/>
              </svg>
            </div>

            <div class="flex flex-col gap-2 pt-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-on-surface font-medium flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-primary"></span>Technical Systems
                </span>
                <span class="font-bold text-on-surface">92%</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-on-surface font-medium flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-primary-container"></span>System Architecture
                </span>
                <span class="font-bold text-on-surface">88%</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-on-surface font-medium flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-secondary"></span>Strategic Domain
                </span>
                <span class="font-bold text-on-surface">86%</span>
              </div>
            </div>
          </div>

          <!-- Learning Sprints -->
          <div class="bg-white rounded-2xl p-5 shadow-xs border border-surface-container">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="font-display text-base font-bold text-on-surface">Targeted Learning Sprints</h4>
                <span class="text-[11px] text-outline">Curated for target role gaps</span>
              </div>
              <span class="material-symbols-outlined text-secondary text-lg">bolt</span>
            </div>

            <div class="flex flex-col gap-3">
              <div class="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <div class="flex items-center justify-between mb-1">
                  <span class="px-2 py-0.5 rounded bg-white text-on-surface-variant text-[10px] font-semibold">Enterprise Academy</span>
                  <span class="text-[10px] text-secondary font-semibold">Priority Gap</span>
                </div>
                <h5 class="text-xs font-bold text-on-surface leading-snug">
                  SOC2 Compliance & Zero Trust Architecture
                </h5>
                <div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-2">
                  <div class="bg-primary-container h-full rounded-full" style="width: 45%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
