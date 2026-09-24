import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ChefHat, Leaf, Clock3, Sparkles, SlidersHorizontal, UtensilsCrossed } from 'lucide-react';
import styles from '../css/Landing.module.css';

const features = [
  { icon: SlidersHorizontal, number: '01', title: 'Make it yours.', text: 'Tell us your dietary preferences, allergies, and comfort level in the kitchen.' },
  { icon: Sparkles, number: '02', title: 'Find your next favorite.', text: 'Get AI-generated recipes with ingredients, clear steps, and estimated nutrition.' },
  { icon: UtensilsCrossed, number: '03', title: 'Less scrolling. More cooking.', text: 'Try a new dish, adjust your preferences, and make everyday meals a little more interesting.' }
];
export default function Landing() {
  return <div className={styles.page}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label="Gourmet Chef home"><span className={styles.brandIcon}><ChefHat size={23} /></span>gourmet<span className={styles.brandLight}>chef</span></Link>
      <nav aria-label="Main navigation" className={styles.nav}><a href="#how-it-works">How it works</a><a href="#in-the-kitchen">In the kitchen</a><Link to="/login">Log in</Link></nav>
      <Link to="/signup" className={styles.headerCta}>Start cooking <ArrowUpRight size={17} /></Link>
    </header>
    <main id="main">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> A LITTLE INSPIRATION. A LOT OF FLAVOR.</p>
          <h1>Good food.<br />Your way.<br /><em>Every day.</em></h1>
          <p className={styles.intro}>Your next favorite meal starts here. Turn your tastes, dietary needs, and everyday cravings into recipes worth making.</p>
          <div className={styles.actions}><Link to="/signup" className={styles.primary}>Find my next meal <ArrowUpRight size={20} /></Link><a href="#how-it-works" className={styles.textLink}>See how it works <ArrowRight size={17} /></a></div>
          <p className={styles.heroNote}><Leaf size={16} /> Made for your tastes. Inspired by AI.</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.photoWrap}><img src="/images/fresh-bowl.jpg" alt="A colorful bowl of fresh vegetables, greens, and grains" className={styles.heroPhoto} fetchPriority="high" width="1100" height="1100" /><span className={styles.photoCaption}>A FRESH TAKE ON EVERYDAY COOKING</span></div>
          <div className={styles.roundLabel}>a little<br /><i>fresh</i><br />inspiration <Sparkles size={16} /></div>
          <div className={styles.recipeCard}><div className={styles.recipeLabel}><span><Sparkles size={14} /> RECIPE INSPIRATION</span><ArrowUpRight size={19} /></div><h2>Your kind of<br />feel-good bowl.</h2><div className={styles.recipeTags}><span><Leaf size={14} /> Plant-forward</span><span><Clock3 size={14} /> Everyday easy</span></div><p>Fresh ideas, tailored to your preferences.</p></div>
        </div>
      </section>
      <div className={styles.ribbon}><span>YOUR TASTE. YOUR TABLE.</span><span><Leaf size={18} /> Dietary preferences</span><span><ChefHat size={18} /> Any skill level</span><span><Sparkles size={18} /> A little AI magic</span></div>
      <section id="how-it-works" className={styles.how}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>FROM “WHAT'S FOR DINNER?” TO “THAT WAS GOOD.”</p><h2>A better idea for<br />your next meal.</h2></div><p>No endless recipe rabbit holes.<br />Just a starting point that feels like you.</p></div>
        <div className={styles.features}>{features.map(({icon:Icon,number,title,text})=><article key={number}><div className={styles.featureTop}><Icon size={27}/><span>{number}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section id="in-the-kitchen" className={styles.kitchen}><div><p className={styles.eyebrow}>A LITTLE CURIOSITY GOES A LONG WAY</p><h2>Know your ingredients.<br /><em>Love what you make.</em></h2><p>Explore food and nutrient information from USDA FoodData Central alongside your recipe inspiration. More context for the ingredients you bring to the table.</p><Link to="/nutritionalData" className={styles.primary}>Explore food & nutrition <ArrowUpRight size={19}/></Link></div><div className={styles.ingredientCard}><span className={styles.smallLabel}>IN THE PANTRY</span><h3>Simple ingredients.<br />So many possibilities.</h3><div><span>🥑 Avocado</span><span>🍋 Lemon</span><span>🥬 Greens</span><span>🍅 Tomato</span></div><p>Search ingredients. Explore nutrients.<br />Find a little inspiration.</p><span className={styles.dataSource}>Food search powered by USDA FoodData Central</span></div></section>
      <section className={styles.faq}><p className={styles.eyebrow}>GOOD QUESTIONS</p><h2>Before you put the apron on.</h2><details><summary>How does Gourmet Chef personalize recipes?</summary><p>Create an account and add your preferences. The recipe assistant uses those details to suggest ingredients and cooking steps. You can edit your setup whenever your tastes change.</p></details><details><summary>Can I use it with dietary restrictions?</summary><p>You can include dietary preferences and allergies in your setup. AI can make mistakes, so always check ingredients and labels yourself. Nutrition in generated recipes is an estimate.</p></details><details><summary>What is the difference between recipe nutrition and food search?</summary><p>Recipe nutrition is estimated by AI. Food search displays records from USDA FoodData Central; values depend on the selected food and its listed serving basis.</p></details></section>
      <section className={styles.finalCta}><p className={styles.eyebrow}>SOMETHING GOOD IS COOKING</p><h2>Let's make your<br /><em>next favorite.</em></h2><Link to="/signup" className={styles.primary}>Get started <ArrowUpRight size={20}/></Link></section>
    </main>
    <footer className={styles.footer}><div><Link to="/" className={styles.brand}><ChefHat size={24}/> gourmetchef</Link><p>A little inspiration for your everyday table.</p></div><nav aria-label="Footer navigation"><a href="https://github.com/nimai-garg/gourmetai" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><Link to="/legal/privacy-policy">Privacy</Link><Link to="/legal/terms-of-use">Terms</Link></nav><p className={styles.copyright}>Built by Nimai Garg · © {new Date().getFullYear()} Gourmet Chef</p></footer>
  </div>;
}
